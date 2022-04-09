package chitchat.utils.data_check;

import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.test.web.servlet.MvcResult;

import java.io.UnsupportedEncodingException;

public class MvcResultChecker {

    public static <T> boolean isMvcResultEqualTo(T targetObject, MvcResult result, Class<T> valueType) {
        try {
            String json = result.getResponse().getContentAsString();
            T objectFromJson = JsonObjectConverter.convertJsonToObject(json, valueType);
            return objectFromJson.equals(targetObject);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static <T> boolean isMvcResultEqualTo(T targetObject, MvcResult result, TypeReference<T> valueTypeRef) {
        try {
            String json = result.getResponse().getContentAsString();
            T objectFromJson = JsonObjectConverter.convertJsonToObject(json, valueTypeRef);
            return objectFromJson.equals(targetObject);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return false;
        }
    }
}
