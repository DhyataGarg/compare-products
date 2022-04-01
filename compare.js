let DUMMY_DATA = []

fetch("./data.json")
.then(response => {
   return response.json();
})
.then(jsonData => 
    {
        jsonData.map(data => DUMMY_DATA.push(data))
        DUMMY_DATA.map((data, index) => document.getElementById('main').appendChild(createNewNode(data, index, false))) 
    }
);

// to set only the required fields in selected produts

const setFields = (product) => {
    let newProduct = {}
    newProduct.title = product.title
    newProduct.description = product.description
    newProduct.SSD = product.SSD

    return newProduct
}

// to get selected produts and display them

function compare () {
    let finalData = []
    var checkedValues = []
    document.getElementById('compare').innerHTML = ""

    var checkboxes = document.querySelectorAll('.compareCheckbox:checked')
    for (var i = 0; i < checkboxes.length; i++) {
        checkedValues.push(checkboxes[i].value)
    }

    let selectedProducts = []
    checkedValues.map(value => selectedProducts.push(DUMMY_DATA[value]))

    selectedProducts.map(product => finalData.push(setFields(product)))

    finalData.map((data, index) => document.getElementById('compare').appendChild(createNewNode(data, index, true))) 
}

//to create a new product div

const createNewNode = (data, index, isCompared) => {
    const productBoxNode = document.createElement("div");

    if(!isCompared){
        var checkbox = document.createElement("INPUT");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute('value', index);
        checkbox.className = 'compareCheckbox';
        productBoxNode.appendChild(checkbox);
    }

    const headingNode = document.createElement('h3')
    const headingTextNode = document.createTextNode(data.title);
    headingNode.appendChild(headingTextNode)

    productBoxNode.appendChild(headingNode);

    Object.keys(data).map(function(key, idx) {
        const paraNode = document.createElement('p')
        const paraTextNode = document.createTextNode(`${key}: ${data[key]}`);
        paraNode.appendChild(paraTextNode);
        productBoxNode.appendChild(paraNode)
    });

    productBoxNode.className = "productBox";
    productBoxNode.setAttribute('id', index)

    return productBoxNode;
}
