package chitchat.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PersonalityResultType {
    CANCEL_VOTE(-1,  "CALCEL_VOTE_FROM_HERE", null),
    CANCEL_ENNEAGRAM_VOTE(-1, "CANCEL_ENNEAGRAM_VOTE", PersonalityTheoryType.ENNEAGRAM),
    CANCEL_MBTI_VOTE(-1, "CANCEL_MBTI_VOTE", PersonalityTheoryType.MBTI),

    ONE_WING_NINE(0, "1w9", PersonalityTheoryType.ENNEAGRAM),
    ONE_WING_TWO(1, "1w2", PersonalityTheoryType.ENNEAGRAM),
    TWO_WING_ONE(2, "2w1", PersonalityTheoryType.ENNEAGRAM),
    TWO_WING_THREE(3, "2w3", PersonalityTheoryType.ENNEAGRAM),
    THREE_WING_TWO(4, "3w2", PersonalityTheoryType.ENNEAGRAM),
    THREE_WING_FOUR(5, "3w4", PersonalityTheoryType.ENNEAGRAM),
    FOUR_WING_THREE(6, "4w3", PersonalityTheoryType.ENNEAGRAM),
    FOUR_WING_FIVE(7, "4w5", PersonalityTheoryType.ENNEAGRAM),
    FIVE_WING_FOUR(8, "5w4", PersonalityTheoryType.ENNEAGRAM),
    FIVE_WING_SIX(9, "5w6", PersonalityTheoryType.ENNEAGRAM),
    SIX_WING_FIVE(10, "6w5", PersonalityTheoryType.ENNEAGRAM),
    SIX_WING_SEVEN(11, "6w7", PersonalityTheoryType.ENNEAGRAM),
    SEVEN_WING_SIX(12, "7w6", PersonalityTheoryType.ENNEAGRAM),
    SEVEN_WING_EIGHT(13, "7w8", PersonalityTheoryType.ENNEAGRAM),
    EIGHT_WING_SEVEN(14, "8w7", PersonalityTheoryType.ENNEAGRAM),
    EIGHT_WING_NINE(15, "8w9", PersonalityTheoryType.ENNEAGRAM),
    NINE_WING_EIGHT(16, "9w8", PersonalityTheoryType.ENNEAGRAM),
    NINE_WING_ONE(17, "9w1", PersonalityTheoryType.ENNEAGRAM),

    INFP(18, "INFP", PersonalityTheoryType.MBTI),
    INFJ(19, "INFJ", PersonalityTheoryType.MBTI),
    ENFP(20, "ENFP", PersonalityTheoryType.MBTI),
    ENFJ(21, "ENFJ", PersonalityTheoryType.MBTI),
    INTP(22, "INTP", PersonalityTheoryType.MBTI),
    INTJ(23, "INTJ", PersonalityTheoryType.MBTI),
    ENTP(24, "ENTP", PersonalityTheoryType.MBTI),
    ENTJ(25, "ENTJ", PersonalityTheoryType.MBTI),
    ISFJ(26, "ISFJ", PersonalityTheoryType.MBTI),
    ISTJ(27, "ISTJ", PersonalityTheoryType.MBTI),
    ESFJ(28, "ESFJ", PersonalityTheoryType.MBTI),
    ESTJ(29, "ESTJ", PersonalityTheoryType.MBTI),
    ISFP(30, "ISFP", PersonalityTheoryType.MBTI),
    ISTP(31, "ISTP", PersonalityTheoryType.MBTI),
    ESFP(32, "ESFP", PersonalityTheoryType.MBTI),
    ESTP(33, "ESTP", PersonalityTheoryType.MBTI);

    private final Integer id;
    private final String name;
    private final PersonalityTheoryType personalityTheoryType;
}
