package chitchat.entity.chat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author zacconding
 * @Date 2018-08-20
 * @GitHub : https://github.com/zacscoding
 */
@Getter
@Setter
@ToString
public class ChatMessage {

    private String senderUserId;

    private String senderUsername;

    private String message;

    private MessageType messageType;

}