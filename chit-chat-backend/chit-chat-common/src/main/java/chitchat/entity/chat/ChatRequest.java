package chitchat.entity.chat;

import java.util.Objects;

/**
 * @author zacconding
 * @Date 2018-08-22
 * @GitHub : https://github.com/zacscoding
 */
public class ChatRequest {

    private String username;

    public ChatRequest() {
    }

    public ChatRequest(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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