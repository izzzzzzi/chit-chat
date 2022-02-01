package kr.co.fastcampus.eatgo.application;

import java.util.function.Supplier;

public class EmailNotExistedException extends RuntimeException {

    EmailNotExistedException(String email) {
        super("Email is not registered : " + email);
    }
}
