export const isResponseOk = (response) => {
    return !(response instanceof Error);
};


export const getData = async (url) => {
    try {
        const response = await fetch(url)
        if (response.status !== 200) {
            throw new Error('Ошибка получения данных')
        }
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}

const normalizeDataObject = (obj) => {
    let str = JSON.stringify(obj)
    str = str.replaceAll("_id", "id")
    const newObject = JSON.parse(str);
    const result = {...newObject, category: newObject.categories}
    return (result)
};

export const normalizeData = (data) => {
    return data.map((item) => {
        return normalizeDataObject(item)
    })
}




export const getNormalizedGamesDataByCategory = async (url, category) => {
    try {
        const data = await getData(`${url}?categories.name=${category}`);
        if (!data || !data.length) {
            throw new Error('Нет игр в категории');
        }
        return isResponseOk(data) ? normalizeData(data) : data;
    } catch (error) {
        return error;
    }
}

export const getNormalizedGameDataById = async (url, id) => {
    const data = await getData(`${url}/${id}`);
    return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const authorize = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (res.status !== 200) {
            throw new Error("Ошибка авторизации");
        }
        const result = await res.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const register = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (res.status !== 200) {
            throw new Error("Ошибка регистрации");
        }
        const result = await res.json();
        return result;
    } catch (error) {
        return error;
    }
};



export const getMe = async (url, jwt) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

export const setJWT = (jwt) => {
    localStorage.setItem("jwt", jwt);
};

export const getJWT = () => {
    return localStorage.getItem("jwt");
};

export const removeJWT = () => {
    localStorage.removeItem("jwt");
};

export const checkIfUserVoted = (game, userId) => {
    return game.users.find((user) => user.id === userId);
};

export const vote = async (url, jwt, usersArray) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ users: usersArray }),
        })
        if (response.status !== 200) {
            throw new Error('Ошибка голосования')
        }
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}

