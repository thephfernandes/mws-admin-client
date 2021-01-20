export default function ({$auth, $axios}) {
    if ($auth.loggedIn) {
        const token = $auth.strategy.token.get().replace('Bearer ', '');

        const parseJwt = (token) => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return null;
            }
        };

        const parsedToken = parseJwt(token);
        const expDate = new Date(parsedToken.exp * 1000);
        const today = new Date();

        if ((expDate - today) < 3600000) {
            refreshToken($auth, $axios).catch((err) => { console.error(err)});
        }
    }
}

async function refreshToken($auth, $axios) {
    const response = await $axios.post('/auth/refresh');

    if (response.status === 200) {
        $auth.setUserToken(response.data.token).catch((err) => { console.error(err) });
    }
}
