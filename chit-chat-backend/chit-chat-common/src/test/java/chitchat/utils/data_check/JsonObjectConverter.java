package chitchat.utils.data_check;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.test.web.servlet.MvcResult;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class JsonObjectConverter {
    public static ObjectMapper objectMapper;
    public static MvcResult mvcResult;

    static {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        objectMapper.setDateFormat(dateFormat);
    }

    public static <T> String convertObjectToJson(T object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static <T> T convertJsonToObject(String userJson, Class<T> valueType) {
        try {
            return objectMapper.readValue(userJson, valueType);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static <T> T convertJsonToObject(String userJson, TypeReference<T> valueTypeRef) {
        try {
            return objectMapper.readValue(userJson, valueTypeRef);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
