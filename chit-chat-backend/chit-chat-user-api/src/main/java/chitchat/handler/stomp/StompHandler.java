package chitchat.handler.stomp;

import chitchat.oauth.exception.TokenValidFailedException;
import chitchat.oauth.token.AuthToken;
import chitchat.oauth.token.AuthTokenProvider;
import chitchat.utils.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;


@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final AuthTokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) throws TokenValidFailedException {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT == accessor.getCommand()) {
            String tokenStr = accessor.getFirstNativeHeader("Authorization");
            tokenStr = HeaderUtil.getPureToken(tokenStr);
            AuthToken token = tokenProvider.convertAuthToken(tokenStr);

            if (!token.validate()) {
                throw new TokenValidFailedException();
            }
        }
        return message;
    }

}