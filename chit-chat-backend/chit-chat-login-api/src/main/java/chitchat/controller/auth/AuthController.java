package chitchat.controller.auth;

import chitchat.entity.auth.AuthReqModel;
import chitchat.entity.user.UserRefreshToken;
import chitchat.repository.UserRefreshTokenRepository;
import chitchat.common.ApiResponse;
import chitchat.config.properties.AppProperties;
import chitchat.oauth.entity.RoleType;
import chitchat.oauth.entity.UserPrincipal;
import chitchat.oauth.token.AuthToken;
import chitchat.oauth.token.AuthTokenProvider;
import chitchat.utils.CookieUtil;
import chitchat.utils.HeaderUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

    @GetMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);
        Claims claims = authRefreshToken.getTokenClaims();
        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        if (!authRefreshToken.validate()) {
            return ApiResponse.invalidRefreshToken();
        }

        // userId refresh token ?????? DB ??????
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
        if (userRefreshToken == null) {
            return ApiResponse.invalidRefreshToken();
        }

        Date now = new Date();
        AuthToken newAccessToken = tokenProvider.createAuthToken(
                userId,
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();

        // refresh ?????? ????????? 3??? ????????? ?????? ??????, refresh ?????? ??????
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh ?????? ??????
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = tokenProvider.createAuthToken(
                    userId,
                    roleType.getCode(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB??? refresh ?????? ????????????
            userRefreshToken.setRefreshToken(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge, true);
        }

        return ApiResponse.success("token", newAccessToken.getToken());
    }

    @PostMapping("/logout")
    @Transactional
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));

        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);
        if (!authRefreshToken.validate()) {
            return ApiResponse.invalidRefreshToken();
        }

        String userId = authRefreshToken.getTokenClaims().getSubject();
        long isDeleted = userRefreshTokenRepository.deleteByUserIdAndRefreshToken(userId, refreshToken);
        if (isDeleted == 1) {
            return ApiResponse.successDeletion();
        }
        else {
            return ApiResponse.invalidRefreshToken();
        }
    }

//        @PostMapping("/login")
//    public ResponseEntity<String> login(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            @RequestBody AuthReqModel authReqModel
//    ) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        authReqModel.getId(),
//                        authReqModel.getPassword()
//                )
//        );
//
//        String userId = authReqModel.getId();
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        Date now = new Date();
//        AuthToken accessToken = tokenProvider.createAuthToken(
//                userId,
//                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );
//
//        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//        AuthToken refreshToken = tokenProvider.createAuthToken(
//                userId,
//                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
//                new Date(now.getTime() + refreshTokenExpiry)
//        );
//
//        // userId refresh token ?????? DB ??????
//        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userId);
//        if (userRefreshToken == null) {
//            // ?????? ?????? ?????? ??????
//            userRefreshToken = new UserRefreshToken(userId, refreshToken.getToken());
//            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
//        } else {
//            // DB??? refresh ?????? ????????????
//            userRefreshToken.setRefreshToken(refreshToken.getToken());
//        }
//
//        int cookieMaxAge = (int) refreshTokenExpiry / 60;
//        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
//        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge, true);
//
//        return ApiResponse.success("token", accessToken.getToken());
//    }
}
