package chitchat.utils;

import chitchat.oauth.exception.TokenValidFailedException;
import chitchat.oauth.token.AuthToken;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

import javax.servlet.http.HttpServletRequest;

public class HeaderUtil {

    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    public static String getAccessToken(HttpServletRequest request) {
        String headerValue = request.getHeader(HEADER_AUTHORIZATION);

        return HeaderUtil.getPureToken(headerValue);
    }

    public static String getPureToken(String headerValue) {
        if (headerValue == null) {
            return null;
        }
        else if (headerValue.startsWith(TOKEN_PREFIX)) {
            return headerValue.substring(TOKEN_PREFIX.length());
        }
        else {
            return null;
        }
    }

}
