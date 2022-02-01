package kr.co.fastcampus.eatgo.interfaces;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class WelcomeController {

    @GetMapping("/")
    public String hello() {
        return "Hello, World!!!";
    }
}
