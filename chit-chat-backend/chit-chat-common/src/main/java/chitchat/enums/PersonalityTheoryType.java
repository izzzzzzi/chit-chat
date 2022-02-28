package chitchat.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PersonalityTheoryType {
        MBTI(0, "MBTI"),
    ENNEAGRAM(1, "ENNEAGRAM"),
    TOTAL_COUNT(2, "TOTAL COUNT");

    private Integer id;
    private String name;
}
