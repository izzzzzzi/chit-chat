package chitchat.exception;

public class UserIdNotFoundError extends RuntimeException {
    public UserIdNotFoundError(String id) {
        super("Could not find user id : " + id);
    }
}
