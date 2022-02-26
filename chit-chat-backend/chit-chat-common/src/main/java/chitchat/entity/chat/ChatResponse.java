package chitchat.entity.chat;

import lombok.Getter;
import lombok.Setter;

/**
 * @author zacconding
 * @Date 2018-08-22
 * @GitHub : https://github.com/zacscoding
 */

@Getter
@Setter
public class ChatResponse {

    private ResponseResult responseResult;
    private String chatRoomId;
    private String username;
    private String userId;

    public ChatResponse() {
    }

    public ChatResponse(ResponseResult responseResult, String chatRoomId, String username, String userId) {
        this.responseResult = responseResult;
        this.chatRoomId = chatRoomId;
        this.username = username;
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ChatResponse{" + "responseResult=" + responseResult + ", chatRoomId='" + chatRoomId + '\'' + ", username='" + username + '\'' + '}';
    }

    public enum ResponseResult {
        SUCCESS, CANCEL, TIMEOUT;
    }
}
