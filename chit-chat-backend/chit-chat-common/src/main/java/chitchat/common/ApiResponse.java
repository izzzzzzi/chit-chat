package chitchat.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;

import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {
    private final static int SUCCESS = 200;
    private final static int CREATED = 201;
    private final static int NOT_FOUND = 400;
    private final static int FAILED = 500;

    private final static String MESSAGE = "message";

    private final static String NOT_FOUND_MESSAGE = "NOT FOUND";
    private final static String FAILED_MESSAGE = "Error occurred in server";
    private final static String INVALID_ACCESS_TOKEN = "Invalid access token.";
    private final static String INVALID_REFRESH_TOKEN = "Invalid refresh token.";
    private final static String NOT_EXPIRED_TOKEN_YET = "Not expired token yet.";

    private final Map<String, T> body;

    public static <T> ResponseEntity<T> success(String name, T body) {
        Map<String, T> map = new HashMap<>();
        map.put(name, body);

        return new ResponseEntity(map, HttpStatus.OK);
    }

    public static <T> ResponseEntity<T> created(String name, T body) {
        Map<String, T> map = new HashMap<>();
        map.put(name, body);

        return new ResponseEntity(map, HttpStatus.CREATED);
    }

    public static <T> ResponseEntity<T> fail() {
        Map<String, String> map = new HashMap<>();
        map.put(MESSAGE, FAILED_MESSAGE);

        return new ResponseEntity(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static <T> ResponseEntity<T> invalidAccessToken() {
        Map<String, String> map = new HashMap<>();
        map.put(MESSAGE, INVALID_ACCESS_TOKEN);

        return new ResponseEntity(map, HttpStatus.UNAUTHORIZED);
    }

    public static <T> ResponseEntity<T> invalidRefreshToken() {
        Map<String, String> map = new HashMap<>();
        map.put(MESSAGE, INVALID_REFRESH_TOKEN);

        return new ResponseEntity(map, HttpStatus.UNAUTHORIZED);
    }

    public static <T> ResponseEntity<T> notExpiredTokenYet() {
        Map<String, String> map = new HashMap<>();
        map.put(MESSAGE, NOT_EXPIRED_TOKEN_YET);

        return new ResponseEntity(map, HttpStatus.UNAUTHORIZED);
    }
}
