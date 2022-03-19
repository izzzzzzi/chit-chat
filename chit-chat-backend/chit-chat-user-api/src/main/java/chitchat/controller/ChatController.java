package chitchat.controller;

import chitchat.entity.chat.ChatMessage;
import chitchat.entity.chat.ChatRequest;
import chitchat.entity.chat.ChatResponse;
import chitchat.entity.chat.MessageType;
import chitchat.entity.user.User;
import chitchat.oauth.token.AuthTokenProvider;
import chitchat.service.UserService;
import chitchat.service.ChatService;
import chitchat.utils.HeaderUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

/**
 * @author zacconding
 * @Date 2018-08-20
 * @GitHub : https://github.com/zacscoding
 */
@RestController
@RequestMapping("/api/user/chat-random")
@RequiredArgsConstructor
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    private final UserService userService;

    private final AuthTokenProvider tokenProvider;

    // tag :: async
    @GetMapping("/join")
    @ResponseBody
    public DeferredResult<ChatResponse> joinRequest() {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        String username = user.getUsername();
        String userId = user.getUserId();

        logger.info(">> Join request. username : {}, userId : {}", userId, username);

        final ChatRequest userChatRequest = new ChatRequest(username, userId);
        final DeferredResult<ChatResponse> deferredResult = new DeferredResult<>(null);
        chatService.joinChatRoom(userChatRequest, deferredResult);

        deferredResult.onCompletion(() -> chatService.cancelChatRoom(userChatRequest));
        deferredResult.onError((throwable) -> chatService.cancelChatRoom(userChatRequest));
        deferredResult.onTimeout(() -> chatService.timeout(userChatRequest));

        return deferredResult;
    }

    @GetMapping("/cancel")
    @ResponseBody
    public ResponseEntity<Void> cancelRequest() {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        String username = user.getUsername();
        String userId = user.getUserId();

        logger.info(">> Cancel request. userId : {}", user.getUserId());

        final ChatRequest userChatRequest = new ChatRequest(username, userId);
        chatService.cancelChatRoom(userChatRequest);

        return ResponseEntity.ok().build();
    }

    // -- tag :: async

    // tag :: websocket stomp
    @MessageMapping("/chat.message/{chatRoomId}")
    public void sendMessage(
            @DestinationVariable("chatRoomId") String chatRoomId,
            @Header("Authorization") String tokenStr,
            @Payload ChatMessage chatMessage
    ) {
        tokenStr = HeaderUtil.getPureToken(tokenStr);
        tokenProvider.convertAuthToken(tokenStr).validate();

        logger.info("Request message. room id : {} | chat message : {} | principal : {}", chatRoomId, chatMessage);

        if (!StringUtils.hasText(chatRoomId) || chatMessage == null) {
            return;
        }

        if (chatMessage.getMessageType() == MessageType.CHAT) {
            chatService.sendMessage(chatRoomId, chatMessage);
        }
    }
    // -- tag :: websocket stomp
}
