console.log("Custom App");

// creata global Store to store the state
const Store = function () {
    let data = {};
    let listeners = [];

    function subscribe(listiner) {
        listeners.push(listiner);
    }

    function notify() {
        listeners.forEach((listiner) => listiner());
    }

    function setData(key, value) {
        data[key] = value;
        notify();
    }

    function getData() {
        return data;
    }

    return {
        setData,
        getData,
        subscribe,
    };
};

const TriggetButton = function () {
    let buttonElement;
    let buttonCallback;

    function init(content) {
        buttonElement = document.createElement("div");
        buttonElement.innerHTML = content || "Click me!";
        buttonElement.setAttribute("id", "chat-button");
        document.body.appendChild(buttonElement);
    }

    function onClick(callback) {
        buttonCallback = callback;
        const button = document.getElementById("chat-button99");
        button.addEventListener("click", buttonCallback);
    }

    function remove() {
        buttonElement.removeEventListener("click", buttonCallback);
        buttonElement.remove();
    }

    return {
        init,
        onClick,
        remove,
    };
};

const InputField = function () {
    let inputElement;
    let inputCallback;

    function init(content) {
        inputElement = document.createElement("div");
        inputElement.innerHTML = content || "Click me!";
        inputElement.setAttribute("id", "chat-box-85");
        let inputField = document.getElementById("chat-button55");
        inputField.appendChild(inputElement);
    }

    function onClick(callback) {
        inputCallback = callback;
        inputElement.addEventListener("click", inputCallback);
    }

    // on key press
    function onKeyPress(callback) {
        inputCallback = callback;
        inputElement.addEventListener("keypress", inputCallback);
    }


    function remove() {
        inputElement.removeEventListener("click", inputCallback);
        inputElement.remove();
    }

    function show () {
        inputElement.style.display = "block";
    }
    function hide () {
        inputElement.style.display = "none";
    }

    return {
        init,
        onClick,
        remove,
        onKeyPress,
        show,
        hide
    };
}

// suggestion Box
const suggestionBox = function () {
    let suggestionElement;
    let suggestionCallback;

    function init(content) {
        suggestionElement = document.createElement("div");
        suggestionElement.innerHTML = content || "Suggestion Box!";
        suggestionElement.setAttribute("id", "suggestion-box");
        let inputField = document.getElementById("chat-box-85");
        inputField.appendChild(suggestionElement);
    }

    function onClick(callback) {
        suggestionCallback = callback;
        suggestionElement.addEventListener("click", suggestionCallback);
    }

    function remove() {
        suggestionElement.removeEventListener("click", suggestionCallback);
        suggestionElement.remove();
    }

    return {
        init,
        onClick,
        remove,
    };
}

// chat Context 
const chatContext = function () {
    const chatUrl = "https://us-central1-smartassistantproject-770b6.cloudfunctions.net/api/client/load-context"
    let data = {};

    function setData(key, value) {
        data[key] = value;
    }

    function getData() {
        return data;
    }

    function callContext() {
        try {
            fetch(chatUrl)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setData("data", data);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getData,
        callContext,
    };

}
const input = `
    <div
        style = "
            position : relative;
            display: flex;
            flex-direction: column-reverse;
        "
    >
        <div
            id="main-chat-box-55"
            style = "
                position: absolute;
                width: 380px;
                height: 510px;
                background-color: #FFF;
                bottom: 36px;
                right: 0px;
                overflow-y: scroll;
                overflow-x: hidden;
                border-radius: 15px;
                border: 1px solid #CECECE;
                box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
                display: none;
            "
        >
        <!-- close button -->
            <div
                id="close-button8585"
                style="
                    position: sticky;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                "
            >
                close
            </div>
            <div
                id="main-response"
                style="
                    position: relative;
                    padding: 24px 33px;
                    "                    
                >
            </div>
           
        </div>
        
        <input type="text" id="inputField99"  
            style="
                padding: 10px;
                width: 381px;
                border: 1px solid #CECECE;
                border-radius: 15px;
                font-size: 12px !important;
                background-color: #FFF;
            "
            placeholder="Ask any thing..."
        />
    </div>
`

// button 
const buttonContent = `
    <div
        id="chat-button55"
        style="
            position: fixed;
            bottom: 100px;
            right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row-reverse;
            z-index: 9999;
        "
    >
    <button id="chat-button99"
        style="
            border: none;
            cursor: pointer;
        "
    >
        <div
            style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            "
        >
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="62" height="45" viewBox="0 0 62 45" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M57.925 33.5092C60.4404 30.2547 61.875 26.4992 61.875 22.5C61.875 10.0736 48.0238 0 30.9375 0C13.8512 0 0 10.0736 0 22.5C0 34.9264 13.8512 45 30.9375 45C37.5612 45 43.6986 43.4861 48.7315 40.9082L60.4167 44.1032L57.925 33.5092Z" fill="#202123"/>
            </svg>
        </i>
        <i
            style="position: absolute;"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="17" viewBox="0 0 34 17" fill="none">
                <path d="M25.4478 0.000184589C24.211 -0.0079528 22.9873 0.253048 21.8623 0.764953C20.7372 1.27686 19.7379 2.02732 18.9342 2.96392L17.673 4.41132L20.4881 7.65075L22.1484 5.74208C22.5559 5.26818 23.0622 4.88845 23.632 4.62932C24.2018 4.3702 24.8214 4.23791 25.4478 4.24166C26.0097 4.23279 26.5678 4.33539 27.0895 4.54349C27.6113 4.7516 28.0862 5.06105 28.4868 5.45382C28.8873 5.84658 29.2054 6.31482 29.4225 6.83126C29.6396 7.3477 29.7514 7.90202 29.7514 8.46193C29.7514 9.02184 29.6396 9.57616 29.4225 10.0926C29.2054 10.609 28.8873 11.0773 28.4868 11.47C28.0862 11.8628 27.6113 12.1723 27.0895 12.3804C26.5678 12.5885 26.0097 12.6911 25.4478 12.6822C24.8234 12.6863 24.2057 12.5547 23.6377 12.2964C23.0697 12.0382 22.5651 11.6596 22.1591 11.1871C15.9935 4.09427 18.923 7.47579 15.0069 2.95861C14.202 2.02365 13.2024 1.27465 12.0775 0.763732C10.9526 0.252813 9.72949 -0.00774679 8.49324 0.000184589C6.24069 0.000184589 4.0804 0.891687 2.48761 2.47857C0.894821 4.06546 0 6.21774 0 8.46193C0 10.7061 0.894821 12.8584 2.48761 14.4453C4.0804 16.0322 6.24069 16.9237 8.49324 16.9237C9.73004 16.9318 10.9537 16.6708 12.0788 16.1589C13.2038 15.647 14.2031 14.8965 15.0069 13.9599L16.2681 12.5125L13.4529 9.27311L11.7926 11.1818C11.3851 11.6557 10.8788 12.0354 10.309 12.2945C9.73923 12.5537 9.11958 12.686 8.49324 12.6822C7.93131 12.6911 7.37323 12.5885 6.85149 12.3804C6.32976 12.1723 5.85479 11.8628 5.45426 11.47C5.05373 11.0773 4.73565 10.609 4.51852 10.0926C4.3014 9.57616 4.18958 9.02184 4.18958 8.46193C4.18958 7.90202 4.3014 7.3477 4.51852 6.83126C4.73565 6.31482 5.05373 5.84658 5.45426 5.45382C5.85479 5.06105 6.32976 4.7516 6.85149 4.54349C7.37323 4.33539 7.93131 4.23279 8.49324 4.24166C9.11758 4.23755 9.7353 4.3692 10.3033 4.62743C10.8713 4.88565 11.3759 5.26424 11.782 5.73678C17.9476 12.8296 15.018 9.44807 18.9342 13.9652C19.857 15.0605 21.0423 15.906 22.3803 16.4236C23.7183 16.9412 25.1657 17.1142 26.5886 16.9264C28.0115 16.7387 29.3639 16.1963 30.5205 15.3495C31.6771 14.5027 32.6006 13.3789 33.2054 12.0821C33.8103 10.7853 34.077 9.35736 33.9808 7.93058C33.8847 6.5038 33.4287 5.12425 32.6553 3.91965C31.8818 2.71504 30.8158 1.72433 29.556 1.03921C28.2961 0.354092 26.8831 -0.00327718 25.4478 0.000184589Z" fill="white"/>
            </svg>
        </i>
        </div>
    </button>
    </div>
`;

const suggestionContainer = `
    <div 
        id = "suggestion-box"
    >
        <div
            id = "suggestion-box-title"
            >
            Suggestion Box  
        </div>

    </div>
`


const mapRes = (res) => {
    const list = document.getElementById("main-response");
    const li = document.createElement("li");
    // style
    li.style.listStyle = "none";
    li.style.marginBottom = "10px";
    li.style.fontSize = "12px";
    li.style.fontWeight = "500";
    li.style.color = "#808080";
    
    li.innerHTML = res.title;
    list.appendChild(li);
}


// map the response
const mapResponse = (response) => {
    response.data.forEach((res) => mapRes(res));
}

// map Question to list
const mapQuestion = (question) => {
    const list = document.getElementById("main-response");
    const li = document.createElement("li");
    // style
    li.style.listStyle = "none";
    li.style.marginBottom = "10px";
    li.style.fontSize = "12px";
    li.style.fontWeight = "500";
    li.style.color = "#808080";
    
    li.innerHTML = question;
    list.appendChild(li);
};

// mapp all the question
const mapAllQuestion = (question) => {
    // make visible the chat box
    const chatBox = document.getElementById("main-chat-box-55");
    chatBox.style.display = "block";
    
    const li = document.createElement("li");
    // style
    li.style.listStyle = "none";
    li.style.marginBottom = "10px";
    li.style.fontSize = "12px";
    li.style.fontWeight = "500";
    li.style.color = "#808080";
    
    li.innerHTML = question;
    chatBox.appendChild(li);
    // const list = document.getElementById("main-response");
    // list.innerHTML = "";
    // question.forEach((question) => mapQuestion(question));
}
;

// post question to the server and get the response back
const url = "https://us-central1-smartassistantproject-770b6.cloudfunctions.net/api/client/chat";
const postQuestion = (question) => {
    console.log(question , "post questions");
    let state = {
        loading: true,
        error: false,
        data: null,
    };
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
        })
            // .then((res) => res.json())
            .then((res) => {
                if (!res.ok) {
                    throw Error("Error fetching data!");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                state.data = data;
                state.loading = false;
            })
            .catch((err) => {
                state.error = err.message;
                state.loading = false;
                reject(err);
            })
            .finally(() => {
                resolve(state);
            });
    });
};

// chnage structure of the response
const structureResponse = (data) => {
    
    let arry = [];
    data?.data?.shopify?.data?.products?.edges?.forEach((res) => {
        // arry.push(res.node);
        const obj = {
            id : res.node?.id,
            title : res.node?.title,
            image : res.node?.images?.edges[0].node.originalSrc,
            tags : res.node?.tags,
            price : res.node?.variants?.edges[0].node.price,
            variantID : res.node?.variants?.edges[0].node.id,
            // also need handle
        }
        arry.push(obj);
    });
   
    return arry;

}

function extractNumberFromVariantString(variantString) {
    // Use a regular expression to extract the number part
    const regex = /(\d+)/;
    const match = variantString.match(regex);

    if (match) {
        // The first captured group (match[1]) contains the number part
        return match[1];
    } else {
        // Return null or handle the case when no number is found
        return null;
    }
}

const addToCard = (variantID) => {
    console.log(variantID);
    // only copy the variant id and add to cart
    
    const url = "https://halebob-la-staging.myshopify.com/cart/add.js";

    const body = {
        variantId : variantID,
        quantity : 1
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
        }
    })

        // .then((res) => res.json())
        .then((res) => {
            if (!res.ok) {
                throw Error("Error fetching data!");
            } else {
                return res.json();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // resolve(state);
        });
}

const mapResponseData = (data) => {

    const list = document.getElementById("main-chat-box-55");
    const li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.marginBottom = "10px";
    // add to card button 
    const addToCard = document.createElement("button");
    addToCard.innerHTML = "Add to Card";
    addToCard.style.padding = "10px";
    addToCard.style.border = "none";
    addToCard.style.borderRadius = "10px";
    addToCard.style.backgroundColor = "#000";
    addToCard.style.color = "#FFF";
    addToCard.style.cursor = "pointer";
    addToCard.style.marginBottom = "10px";
    addToCard.style.fontSize = "12px";
    addToCard.style.fontWeight = "500";

    addToCard.addEventListener("click", () => {

        // add to cart
        console.log("Add to cart");
        console.log(data.variantID);
        const variationNo = extractNumberFromVariantString(data.variantID);
        console.log(variationNo);
        // only copy the variant id and add to cart
        addToCard(variationNo);
    })

    // catd
    const card = document.createElement("div");
    // id to card
    card.setAttribute("id", "card");
    // style
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.padding = "10px";
    // imag wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.setAttribute("id", "image-wrapper");
    imageWrapper.style.display = "flex";
    imageWrapper.style.justifyContent = "center";
    imageWrapper.style.alignItems = "center";
    imageWrapper.style.marginBottom = "10px";
    imageWrapper.style.width = "100px";
    imageWrapper.style.borderRadius = "10px";
    // image
    const image = document.createElement("img");
    image.setAttribute("src", data.image);
    image.style.objectFit = "cover";
    image.style.width = "100px";

    // lazy loading
    image.setAttribute("loading", "lazy");
    image.style.borderRadius = "10px";
    image.style.marginBottom = "10px";

    // title
    const title = document.createElement("div");
    title.innerHTML = data.title;
    title.style.marginBottom = "10px";
    title.style.fontSize = "12px";
    title.style.fontWeight = "500";
    title.style.color = "#808080";

    // price
    const price = document.createElement("div");
    // price.innerHTML = data.price;
    price.innerHTML = "$" + data.price;
    price.style.marginBottom = "10px";
    price.style.fontSize = "12px";
    price.style.fontWeight = "500";
    price.style.color = "#808080";

    // append to card
    imageWrapper.appendChild(image);
    card.appendChild(imageWrapper);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(addToCard);

    // append to list
    li.appendChild(card);
    list.appendChild(li);
}

const callLayer = async (callback) => {
    // show loader
    let loader = true

    const list = document.getElementById("main-chat-box-55");
    const li = document.createElement("li");

    if (loader) {
        console.log("Loading...");
        // style
        li.style.listStyle = "none";
        li.style.marginBottom = "10px";
        li.style.fontSize = "12px";

        li.innerHTML = "Loading...";
        list.appendChild(li);
    }

    // data fetch
    callback
        .then((data) => {
            // console.log(data);
            // hide loader
            loader = false;
            li.innerHTML = "";
            // structure the response
            const response = structureResponse(data);
            console.log(response);
            // show data
            response.forEach((res) => mapResponseData(res));
            // show in pre tag
        })
        .catch((err) => {
            console.log(err);
            loader = false;
            li.innerHTML = "error";
            // show error
            console.log("Error");
        });
};
    

function main() {
    // show data variable properly 
    const store = Store();
    const storeData = store.getData();
    console.log(storeData);
    // set data
    store.setData("question", []);
    store.setData("context", {});
    

    // inpu field
    const inputF = InputField();
    // suggestion box
    const suggestion = suggestionBox();
    // suggestion.init();

    // chat context
    const chat = chatContext();
    // create a button
    const button = TriggetButton();
    button.init(buttonContent);
    inputF.init(input);
    inputF.hide();
    // suggestions
    // suggestion.init(suggestionContainer);
    button.onClick(() => {
        console.log("Button clicked!");
        inputF.show()
        // call chat context
        chat.callContext();
        store.setData("context", chat.getData());
        console.log(store.getData());

        // get chat context
    });
    
    // close button 
    const closeButton = document.getElementById("close-button8585");
    closeButton?.addEventListener("click", () => {
        inputF.hide();
    });
    // on enter press
    const inputField = document.getElementById("inputField99");
    inputField?.addEventListener("keyup", async (e) => {
        if (e.keyCode === 13) {
            console.log(inputField.value);
            // push inside Question
            storeData.question.unshift({
                id: Math.random(),
                question: e.target.value,
            });

            const data = {
                role : "user",
                content : e.target.value
            }
            storeData.context.data.map((res) => {
                if(res._id) {
                    console.log(res._id , "removed");
                    // remove from object
                    delete res._id;
                }
            })

            storeData.context.data.push(data);

            mapAllQuestion(e.target.value);
            const dataArray = storeData.context.data;
            await callLayer(postQuestion(dataArray));
            inputField.value = "";
            // remove user question from context
            storeData.context.data.pop();
            console.log(storeData);
        }
    });

}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
