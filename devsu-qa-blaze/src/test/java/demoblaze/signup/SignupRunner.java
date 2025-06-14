package demoblaze.signup;
import com.intuit.karate.junit5.Karate;

public class SignupRunner {
    @Karate.Test
    Karate SignupTests(){
        return Karate.run("signup")
                .relativeTo(getClass());
    }
}