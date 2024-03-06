const newURL = "https://crbrvsraphive.com/";

window.onload = redirect(newURL);

function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            return false;
        });
}

function redirect(newURL) {
    const currentUrl = document.URL;
    if (currentUrl.includes('crbrvs-rap.') == true) {
        var isAvailible = false;
        fetchData(newURL)
            .then(data => {
                isAvailible = data;
                if (isAvailible == true) {
                    location.replace(newURL);
                }
            });
    }
}
