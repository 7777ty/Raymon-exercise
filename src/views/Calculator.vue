<template>
    <div class="wrapper">
        <button class="routerLink"><router-link to="/echarts">跳转至echarts</router-link></button>
        <div class="result" >
            <div class="history" v-if="historyInput">{{historyInput}}</div>
            <div v-if="result">{{`=${this.result}`}}</div>
            <div v-else>{{currentOutput}}</div>
        </div>
        <div class="numberPad">
            <button @click="onClear">C</button>
            <button @click="onDeleteCount">删除</button>
            <button v-for="item in inputButton" @click="onInputCount" :key="item">{{item}}</button>
            <button @click="onComputed">=</button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                inputButton:['%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.'],
                operatorString :'+-*/%',
                numberString:'0123456789',
                suffixExpression:'',
                numberStack:[],
                operatorStack:[],
                historyInput:'',
                currentOutput:'0',
                result:'',
            }
        },
        methods:{
            onInputCount: function (e) {
                const input = e.target.textContent;
                const length = this.currentOutput.length;
                if (this.currentOutput.length === 16) {
                    return
                }
                if (this.currentOutput === '0') {
                    if (this.numberString.includes(input)) {
                        this.currentOutput = input;
                    } else if (this.operatorString.includes(input)|| input==='.') {
                        this.currentOutput += input;
                    }
                    return;
                }
                if(this.currentOutput[length-1]==='0'){
                        for(let i=length-1; i>=0;i--){
                            if(this.operatorString.includes(this.currentOutput[i])){
                                return;
                            }
                        }
                }
                if(this.operatorString.includes(this.currentOutput[length-1]) && input==='.'){return;}
                if(this.currentOutput.includes('.') && input==='.'){
                    // eslint-disable-next-line no-useless-escape
                    if(!(this.currentOutput.slice(this.currentOutput.lastIndexOf('.')).match(/\+[0-9]|\-[0-9]|\*[0-9]|\/[0-9]|\%[0-9]?/))){
                        return;
                    }
                }
                if (this.operatorString.includes(input)){
                    if (this.operatorString.includes(this.currentOutput[length-1])||this.currentOutput.endsWith('.')){
                        return;
                    }
                }
                    this.currentOutput += input;
            },
            onComputed:function () {
                if(this.currentOutput==='0'){return}
                this.toRPolish(this.currentOutput);
                this.suffixExpression.forEach((e)=>{
                   if(!(this.operatorString.includes(e))){
                       this.numberStack.push(e);
                   } else {
                       const number1=parseFloat(this.numberStack.pop());
                       const number2=parseFloat(this.numberStack.pop());
                       let sum=0;
                       switch (e) {
                            case '+':{
                               sum=number1+number2;
                               this.numberStack.push(sum);
                               break
                           }
                           case '-':{
                               sum=number2-number1;
                               this.numberStack.push(sum);
                               break
                           }
                           case '*':{
                               sum=number1*number2;
                               this.numberStack.push(sum);
                               break
                           }
                           case '/':{
                               if (number1===0){
                                   window.alert("除数不能为0！！！");
                                   this.historyInput='';
                                   break;
                               }
                               sum=number2/number1;
                               this.numberStack.push(sum);
                               break;
                           }
                           case '%':{
                               if (!(Number.isInteger(number2)&&Number.isInteger(number1))){
                                   window.alert("求余运算两边必须是整数！！！");
                                   this.historyInput='';
                                   break;
                               }
                               if(number1=== 0){
                                   window.alert("求余运算的分母不可为0！！！");
                                   this.historyInput='';
                                   break;
                               }
                               sum=number2%number1;
                               this.numberStack.push(sum);
                               break;
                           }
                       }
                   }
               });
                this.result=this.numberStack.pop();
                this.currentOutput='0';
                this.suffixExpression=[];
            },
            onClear:function () {
                this.currentOutput='0';
                this.result='';
                this.historyInput=''
            },
            onDeleteCount:function () {
                if(this.currentOutput.length>1){
                    this.currentOutput=this.currentOutput.substring(0, this.currentOutput.length - 1);
                }else {
                    this.currentOutput='0';
                }

            },
            toRPolish:function (input) {
                const S1=[]; //操作数栈
                const S2=[]; //运算符栈
                let flag=true;
                if(this.operatorString.includes(input[input.length-1])){
                    input=input.substring(0, input.length - 1);
                }
                for (let i =0 ;i<input.length;i++){
                    if(this.numberString.includes(input[i])){
                        for(let j =i;j<input.length;j++){
                            if(this.operatorString.includes(input[j])){
                                S1.push(input.slice(i,j));
                                if (S2.length===0 || !this.toCompareOperator(S2[S2.length-1],input[j])){
                                    S2.push(input[j]);
                                    flag=false;
                                }else if(this.toCompareOperator(S2[S2.length-1],input[j])){
                                    flag=true;
                                    S1.push(S2.pop());
                                    while(flag){
                                        if (S2.length===0 || !this.toCompareOperator(S2[S2.length-1],input[j])){
                                            S2.push(input[j]);
                                            flag=false;
                                        }else if(this.toCompareOperator(S2[S2.length-1],input[j])){
                                            S1.push(S2.pop());
                                        }
                                    }
                                }
                                i=j;
                                break;
                            }else if(j===input.length-1){
                                S1.push(input.slice(i,j+1));
                                while (S2.length>0){
                                    S1.push(S2.pop());
                                }
                                i=j;
                            }
                        }
                    }
                }
                this.suffixExpression=S1;
                this.historyInput=this.currentOutput;
            },
            toCompareOperator:function (a, b) {
                if(a === '*' || a === '/' || a === '%'){
                    return true
                }else if((a === '+' || a === '-') && ((b === '*' || b === '/' || b === '%'))){
                    return false
                }

            }
        }
    }
</script>

<style lang='scss' scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        margin: auto;
        background: #000;
        max-width: 500px;
        height: 90vh;
        color: white;
        .result{
            display: flex;
            flex:1;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            font-size: 32px;
            padding-bottom: 5px;
            border-bottom: 1px solid #333;
            margin: 10px 10px;
            cursor: default;
        }
        .numberPad{
            > button{
                width: 25%;
                height: 50px;
                border: 0;
                font-size: 24px;
                background-color: transparent;
                outline: none;
                color: white;
            }
        }
        .history{
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            font-size: 32px;
            padding-bottom: 5px;
        }
    }
    .routerLink{

        position: fixed;
        right:30px;
        top:30px;
    }
</style>
