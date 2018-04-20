const buildContentTree = content => {
    let contentObject = {};
    const contentTree = [];
    
    if (content.constructor === Array) {
        for(const page of content) {
            contentObject[page._id] = page;
            contentObject[page._id].children = [];
        }
    } else {
        contentObject = content;
    }
    
    for (const page of content) {
        if(page.parent) {
            contentObject[page.parent].children.push(page);
        } else {
            contentTree.push(page);
        }
    }
    
    return contentTree;
}

const convertArrayToDictionary = array => {
    const obj = {};

    for(const item of array) {
        obj[item._id] = item;
    }

    return obj;
};

const camelize = str => {
    // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
}

const createFakeItemResponse = item => {
    return {data:{success: true, item}};
}

export {buildContentTree, convertArrayToDictionary, camelize, createFakeItemResponse};
