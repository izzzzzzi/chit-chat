package chitchat.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EnneagramType {
    ONE_WING_NINE(0, "1w9"),
    ONE_WING_TWO(1, "1w2"),
    TWO_WING_ONE(2, "2w1"),
    TWO_WING_THREE(3, "2w3"),
    THREE_WING_TWO(4, "3w2"),
    THREE_WING_FOUR(5, "3w4"),
    FOUR_WING_THREE(6, "4w3"),
    FOUR_WING_FIVE(7, "4w5"),
    FIVE_WING_FOUR(8, "5w4"),
    FIVE_WING_SIX(9, "5w6"),
    SIX_WING_FIVE(10, "6w5"),
    SIX_WING_SEVEN(11, "6w7"),
    SEVEN_WING_SIX(12, "7w6"),
    SEVEN_WING_EIGHT(13, "7w8"),
    EIGHT_WING_SEVEN(14, "8w7"),
    EIGHT_WING_NINE(15, "8w9"),
    NINE_WING_EIGHT(16, "9w8"),
    NINE_WING_ONE(17, "9w1"),
    TOTAL_COUNT(18, "TOTAL COUNT");

    private final Integer id;
    private final String name;
}
