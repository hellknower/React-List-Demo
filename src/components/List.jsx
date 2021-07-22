import React,{ Component } from 'react';
import { Button, List, Modal, Input } from 'antd';
import './List.css';

export default class ListComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            data:[],
            addContent:'',
            editContent:'',
        };

        this.addInput = React.createRef();
        this.editInput = React.createRef();
    }

    componentDidMount(){
        if(localStorage.getItem('data')){
            this.setState({
                data:localStorage.getItem('data').split(',')
            });
        }else{
            localStorage.setItem('data',[
                'Racing car sprays burning fuel into crowd.',
                'Japanese princess to wed commoner.',
                'Australian walks 100km after outback crash.',
                'Man charged over missing wedding girl.',
                'Los Angeles battles huge wildfires.',
            ]);
        }
    }

    changeInput(item){
        if(item.target.id === "addInput"){
            this.setState({
                addContent:item.target.value
            });
        }else if(item.target.id === "editInput"){            
            this.setState({
                editContent:item.target.value
            });
        }
    }
    //添加按钮
    addClick(){
        if(this.state.addContent){
            this.state.data.push(this.state.addContent);
            this.setState({
                data:this.state.data,
                addContent:'',
            });
            localStorage.setItem('data',this.state.data)
            this.addInput.current.state.value = '';
        }else{
            Modal.error({
                title: '请输入，输入不能为空'
            });
        }
    }
    //删除按钮
    deleteClick(index){
        this.state.data.splice(index,1);
        this.setState({
            data:this.state.data
        });
        localStorage.setItem('data',this.state.data)
    }
    //查看按钮
    viewClick(index){
        Modal.info({
            title: this.state.data[index],
        });
    }
    //修改按钮
    editClick(index){
        if(this.state.editContent){
            this.state.data[index] = this.state.editContent;
            this.setState({
                data:this.state.data,
                editContent:'',
            });
            localStorage.setItem('data',this.state.data)
            this.editInput.current.state.value = '';
        }else{
            Modal.error({
                title: '请输入，输入不能为空'
            });
        }
    }

    render(){
        return (
        <div>
            <div class="head">
                <Input placeholder="请输入增加内容" id="addInput" ref={this.addInput} onChange={(item)=>{this.changeInput(item)}}/>
                <Button className="button" onClick={()=>this.addClick()}>添加</Button>
            </div>
                <List
                    className="list"
                    header={<div>List Demo</div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={(item,index)=>(
                        <List.Item>
                            <p className="content">{item}</p>
                            <Button className="button" onClick={()=>this.deleteClick(index)}>删除</Button>
                            <Button className="button" onClick={()=>this.editClick(index)}>修改</Button>
                            <Button className="button" onClick={()=>this.viewClick(index)}>查看</Button>
                            <Input placeholder="请输入修改内容" id="editInput" ref={this.editInput} onChange={(item)=>{this.changeInput(item)}}/>
                        </List.Item>
                    )}  
                
                />             
        </div>)
    }
}