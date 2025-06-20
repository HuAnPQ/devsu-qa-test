function fn() {
    karate.configure('connectTimeout', 10000);
    karate.configure('readTimeout', 10000);

    return {
        api: {
            mainUrl: 'https://api.demoblaze.com'
        },
        user: {
            name: 'hp2022_1',
            pass: '2022'
        },
        data_not_exist: {
            user: 'user+karate+593+2025',
            message: {"errorMessage":"User does not exist."}
        },
        header_login : {
            Auth_token: 'aHAyMDIyXzExNzUxMDM2'
        }
    };
}