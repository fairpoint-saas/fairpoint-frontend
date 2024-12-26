function calculateTotalCost(product, costs) {
    return product.costs.map(productCost => {
        const cost = costs.find(cost => cost._id === productCost.cost._id);
        return cost ? (productCost.quantity * cost.value) : 0;
    }).reduce((acc, curr) => acc + curr, 0);
}

function calculateCostForEach(product, costs) {
    return product.costs.map(productCost => {
        const cost = costs.find(cost => cost._id === productCost.cost._id);
        return {
            ...productCost,
            totalCost: cost ? (productCost.quantity * cost.value) : 0
        };
    });
}

export { calculateTotalCost, calculateCostForEach };
