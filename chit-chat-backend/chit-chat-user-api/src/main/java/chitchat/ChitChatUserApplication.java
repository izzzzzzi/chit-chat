package chitchat;

import chitchat.config.properties.AppProperties;
import chitchat.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
@EnableAsync
public class ChitChatUserApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChitChatUserApplication.class, args);
    }
}
