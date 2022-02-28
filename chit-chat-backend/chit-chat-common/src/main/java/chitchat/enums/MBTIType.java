package chitchat.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MBTIType {
    INFP(0, "INFP"),
    INFJ(1, "INFJ"),
    ENFP(2, "ENFP"),
    ENFJ(3, "ENFJ"),
    INTP(4, "INTP"),
    INTJ(5, "INTJ"),
    ENTP(6, "ENTP"),
    ENTJ(7, "ENTJ"),
    ISFJ(8, "ISFJ"),
    ISTJ(9, "ISTJ"),
    ESFJ(10,"ESFJ"),
    ESTJ(11, "ESTJ"),
    ISFP(12, "ISFP"),
    ISTP(13, "ISTP"),
    ESFP(14, "ESFP"),
    ESTP(15, "ESTP"),
    TOTAL_COUNT(16, "TOTAL COUNT");


    private final Integer id;
    private final String name;
}
