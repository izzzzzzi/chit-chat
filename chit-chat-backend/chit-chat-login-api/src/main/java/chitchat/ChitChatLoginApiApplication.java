package chitchat;

import chitchat.config.properties.AppProperties;
import chitchat.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
public class ChitChatLoginApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChitChatLoginApiApplication.class, args);
    }

}
