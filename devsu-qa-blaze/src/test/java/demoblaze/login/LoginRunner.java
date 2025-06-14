package demoblaze.login;
import com.intuit.karate.junit5.Karate;

public class LoginRunner {
    @Karate.Test
    Karate LoginTests(){
        return Karate.run("login")
                .relativeTo(getClass());
    }
}