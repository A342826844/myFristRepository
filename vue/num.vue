<template>
    <div>
        <button @click="addNum">添加</button>
        <ul>
            <li v-for="(item, index) in todoList" :key='index'>{{todoNumTrem(item)+ '======'+  !!(todoNumTrem(item))}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todoList: [0.0000000056000028888, 0.0000000002]
        }
    },
    methods: {
        numR() {
            let num = (Math.random()) / (this.createTen());
            return num;
        },
        addNum() {
            this.todoList.push(this.numR())
            console.log(this.todoList)
        },
        todoNumTrem(val) {
            let n = Number(val);
            let m = n.toFixed(8);
            return !!isNaN(m) ? false : !Number(m) ? '0' : m
        },
        createTen() {
            let n = Math.floor(Math.random()*4)+4;
            let temp = '1'
            for(let i = 0;i<=n;i++){
                temp += '0';
            }
            console.log(temp)
            return Number(temp);
        }
    }
}
</script>

<style>

</style>
