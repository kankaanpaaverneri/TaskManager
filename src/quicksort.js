function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

export function quicksort(array, lowIndex, highIndex) {
    if(lowIndex >= highIndex)
        return;

    const pivot = array[highIndex].taskPriority;
    let leftPointer = lowIndex;
    let rightPointer = highIndex;

    while(leftPointer < rightPointer) {
        while(array[leftPointer].taskPriority <= pivot && leftPointer < rightPointer)
            leftPointer++;

        while(array[rightPointer].taskPriority >= pivot && leftPointer < rightPointer)
            rightPointer--;

         swap(array, leftPointer, rightPointer);
    }
    
    swap(array, leftPointer, highIndex);
    quicksort(array, lowIndex, leftPointer - 1);
    quicksort(array, leftPointer + 1, highIndex);
}