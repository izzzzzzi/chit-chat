package chitchat.entity.chat;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

/**
 * @author zacconding
 * @Date 2018-08-22
 * @GitHub : https://github.com/zacscoding
 */
@Getter
@Setter
public class ChatRequest {

    private String username;
    private String userId;

    public ChatRequest() {
    }

    public ChatRequest(String username, String userId) {
        this.username = username;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChatRequest)) {
            return false;
        }

        ChatRequest that = (ChatRequest) o;
        return Objects.equals(this.username, that.username);
    }

    @Override
    public int hashCode() {
        return username.hashCode();
    }

    @Override
    public String toString() {
        return "ChatRequest{" + "sessionId='" + username + '\'' + '}';
    }
}