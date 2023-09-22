class Node {
    constructor(tagName, attributes, children, data = "", css = {}) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
        this.data = data;
        this.css = css;
    }

    createElement() {
        const element = document.createElement(this.tagName);
        this.setAttributes(element);
        this.appendChildren(element);
        this.showData(element);
        // also add style
        this.style(element);

        return element;
    }

    setAttributes(element) {
        for (let key in this.attributes) {
            if (this.attributes.hasOwnProperty(key)) {
                element.setAttribute(key, this.attributes[key]);
            }
        }
    }

    setData(data) {
        this.data = data;
        this.showData(this.element);
    }

    showData(element) {
        // if (this.data) {
        //     element.appendChild(document.createTextNode(this.data));
        // }
        if (this.data) {
            element.textContent = this.data;
        }
    }

    appendChildren(element) {
        for (let child of this.children) {
            if (child instanceof Node) {
                // element.appendChild(child.element);
                element.appendChild(child.createElement());
            } else if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
            }
        }
    }

    show(target) {
        const parentElement = target || document.body;
        parentElement.appendChild(this.createElement());
    }
    // apply css to element
    style(element) {
        const css = this.css;
        if (element && typeof css === "object") {
            for (let key in css) {
                if (css.hasOwnProperty(key)) {
                    element.style[key] = css[key];
                }
            }
        }
        return element;
    }
    remove() {
        const element = document.getElementById(this.attributes.id);
        if (element) {
            element.remove();
        }
    }
    insertChild(newNode, reference) {
        console.log(newNode, reference);
        const referenceNode = document.getElementById(reference);
        console.log(referenceNode);
        if (referenceNode) {
            referenceNode.appendChild(newNode);
        }
    }
}

class Button extends Node {
    constructor(attributes, children, data = "", css, onClick = null) {
        super("button", attributes, children, data, css);
        this.onClick = onClick;
    }

    createElement() {
        const element = super.createElement();
        if (this.onClick) {
            element.addEventListener("click", this.onClick);
        }
        return element;
    }
}

const Modal = (function () {
    let modalElement;
    let modalContentElement;
    let modalCloseElement;
    let modalCallback;

    function init() {
        modalElement = document.createElement("div");
        modalElement.classList.add("modal");

        modalContentElement = document.createElement("div");
        modalContentElement.classList.add("modal-content");

        modalCloseElement = document.createElement("span");
        modalCloseElement.classList.add("close");
        modalCloseElement.innerHTML = "&times;";
        modalCloseElement.addEventListener("click", closeModal);

        modalContentElement.appendChild(modalCloseElement);
        modalElement.appendChild(modalContentElement);
        document.body.appendChild(modalElement);
    }

    function openModal(content, callback) {
        modalContentElement.innerHTML = content;
        modalElement.style.display = "block";
        modalCallback = callback;
    }

    function closeModal() {
        modalElement.style.display = "none";
        if (modalCallback) {
            modalCallback();
        }
        //  remove from dom
        modalElement.remove();
    }

    return {
        init,
        openModal,
        closeModal,
    };
})();

    // how to write css for modal

const modalContent = `
    <div
        style="
            border: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 500px;
            border: 1px solid black;
            background-color: white;
            color: black;
            z-index: 9999;
            border-radius: 5px;
            border: 1px solid black;
        "
    >
        <div
            style="
                position: relative;
                padding: 10px;
                border: none;
                width: 100%;
                height: 100%;
            "
        >
            <span
                style="
                    position: absolute;
                    top: 5%;
                    right: 3%;
                    transform: translate(-50%, -50%);
                    background-color: gray;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                "
            >&times;</span>
            <h1>Modal Title</h1>
            <p>Some text in the Modal..</p>
            <div>
                <input type="text" id="inputField" class="inputField" />
                <button id="submit" class="buttonWithClickEvent">Click me!</button>
            </div>
        </div>
    </div>
`;

function main() {

    let state; // The variable to hold the current state
    let setStateCallback; // A callback function to set the state

    const useState = (initialValue) => {
        state = state || initialValue;

        // Define a setState function to update the state
        function setState(newState) {
            state = newState; // Update the state
            if (setStateCallback) {
                setStateCallback(state); // Execute the callback to trigger re-render
            }
        }
        return [state, setState];
    };

    // const ul = document.getElementById('authors');
    // const url = 'https://randomuser.me/api/?results=10';

    // fetch(url)
    //     .then((resp) => resp.json())
    //     .then(function(data) {
    //         let authors = data.results;
    //         console.log(authors);
    //         return authors.map(function(author) {
    //             let li = createNode('li'),
    //                 img = createNode('img'),
    //                 span = createNode('span');
    //             img.src = author.picture.medium;
    //             span.innerHTML = `${author.name.first} ${author.name.last}`;
    //             // append(li, img);
    //             append(li, span);
    //             append(ul, li);
    //         })
    //     }
    // )
    // .catch(function(error) {
    //     console.log(error);
    // }
    // );



    // show a div with data
    // const divWithData = new Node("div", {
    //     id: "divWithData",
    //     class: "divWithData",
    // }, [], "Hello World!");
    // divWithData.show();

    // // show a div with children
    // const divWithChildren = new Node("div", {
    //     id: "divWithChildren",
    //     class: "divWithChildren",
    // }, [
    //     new Node("p", {}, [
    //         new Node("span", {}, [], "Hello World! Span"),
    //     ], "Hello World!"),
    //     new Node("p", {}, [], "Hello World!"),
    //     new Node("p", {}, [], "Hello World!"),
    // ]);
    // divWithChildren.show();

    // // show a div with show Data
    // const divWithShowData = new Node("div", {
    //     id: "divWithShowData",
    //     class: "divWithShowData",
    // }, [], "Hello World!");

    // divWithShowData.setData("Hello World! Again!");
    // divWithShowData.show();

    // // appendChild
    // const divWithAppendChild = new Node("div", {
    //     id: "divWithAppendChild",
    //     class: "divWithAppendChild",
    // }, [], "Hello World!");

    // const span = new Node("span", {}, [], "Hello World! Span");
    // divWithAppendChild.children.push(span);
    // divWithAppendChild.show();

    // button with click event

    const ChatBox = new Node(
        "div",
        {
            id: "ChatBox",
            class: "ChatBox",
        },
        [],
        "ChatBox",
        (css = {
            padding: "10px",
            border: "none",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            border: "1px solid black",
            backgroundColor: "white",
            color: "black",
            zIndex: "9999",
            borderRadius: "5px",
            border: "1px solid black",
        })
    );

    // inner Chat Box
    const innerChatBox = new Node(
        "div",
        {
            id: "innerChatBox",
            class: "innerChatBox",
        },
        [],
        "innerChatBox",
        (css = {
            position: "relative",
            width: "100%",
            height: "100%",
        })
    );

    const closeButton = new Button(
        { id: "closeButton", class: "closeButton" },
        [],
        "close",
        (css = {
            position: "absolute",
            top: "0%",
            right: "0%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "gray",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        })
    );

    closeButton.onClick = () => {
        console.log("closeButton clicked!");
        const divWithDataAndChildren = document.getElementById("ChatBox");
        divWithDataAndChildren.remove();
    };

    // show a div with input field
    const inputField = new Node(
        "input",
        {
            id: "inputField",
            class: "inputField",
        },
        [],
        "",
        (css = {
            padding: "10px",
            // border: "none",
        })
    );

    const styleButton = {
        position: "fixed",
        top: "95%",
        right: "2%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "gray",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    const buttonWithClickEvent = new Button(
        { id: "buttonWithClickEvent", class: "buttonWithClickEvent" },
        [],
        "Click me!",
        (css = styleButton)
    );

    // ChatBox.show();
    // ChatBox.insertChild(innerChatBox.createElement(), "ChatBox");
    // ChatBox.insertChild(inputField.createElement(), "innerChatBox");
    // ChatBox.insertChild(closeButton.createElement(), "innerChatBox");

    buttonWithClickEvent.onClick = () => {
        console.log("Modal Button clicked!");
        const [state, setState] = useState("red");
        // make an arry to store the state
        let data = []
        console.log(state);
        console.log(data , "ARR");
        const buttonWithClickEvent = document.getElementById(
            "buttonWithClickEvent"
        );

        if (state === "red") {
            buttonWithClickEvent.style.backgroundColor = state;
            /// show a div with input field
            // input  Change
            Modal.init();
            Modal.openModal(modalContent, () => {
                console.log("Modal closed!");
            });

            // on enter press
            const inputField = document.getElementById("inputField");
            inputField?.addEventListener("keyup", (e) => {
                if (e.keyCode === 13) {
                    console.log("Enter pressed!");
                    console.log(e.target.value);
                    data.push(e.target.value);
                    console.log(data);  
                    // empty the input field
                    inputField.value = "";
                }
            });


            const submit = document.getElementById("submit");
            submit?.addEventListener("click", (e) => {
                console.log("submit clicked!");
                const input = document.getElementById("inputField");
                console.log(input.value);
                data.push(input.value);
                console.log(data);
                // empty the input field
                input.value = "";

            });



            setState("blue");
        } else {
            buttonWithClickEvent.style.backgroundColor = state;
            Modal.closeModal();
            setState("red");
        }
    };

    buttonWithClickEvent.show();

}

main();
