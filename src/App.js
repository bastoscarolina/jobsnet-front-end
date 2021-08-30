import React, { useState, useRef} from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import logo from './logo.png';
import './App.css';
import axios from 'axios';
import * as Yup from  "yup";
import Input from "./components/Form/input";
import Select, { selectGender, selectMonth, selectNumber, selectStatus} from "./components/Form/select";


function App() {
  const formRef = useRef(null);

  const fetchEndereco = async () => {
    const address = await axios.get(`https://viacep.com.br/ws/${candidato.cep}/json/`);
    setCandidato({ ...candidato, rua: address.data.rua });
  };

  const [candidato, setCandidato] = useState({
    nomeCompleto: '',
    email: '',
    dia:'',
    mes:'',
    ano:'',
    genero:'',
    status: '',
    cargo: '',
    rua:'',
    numero:'',
    bairro:'',
    cidade:'',
    cep:'',
    telefone1:'',
    telefone2:'',
    celular:'',
    contato:'',
    identidade:'',
    cpf:'',
    veiculo:'',
    licenca:''

  });
 
  const selectVehicle = [
    { value : '', label : ''},
    { value : 'sim', label : 'Sim'},
    { value : 'nao', label : 'Não'},
  ];

  const selectLicense = [
    { value : '', label : ''},
    { value : 'a', label : 'A'},
    { value : 'b', label : 'B'},
    { value : 'c', label : 'C'},
    { value : 'd', label : 'D'},
    { value : 'e', label : 'E'},
    { value : 'na', label : 'Não se aplica'},
  ];
  
   
  async function handleSubmit(data, {reset}) {
    try {
      const schema = Yup.object().shape({
        nomeCompleto : Yup.string().required('O nome é obrigatório'),
        email : Yup.string()
        .email('Digite um email válido')
        .required('Email é obrigatório'),
        endereco: Yup.object().shape({
          rua: Yup.string().required('Endereço é obrigatório'),
          numero: Yup.string().required('O número é é obrigatório'),
          bairro: Yup.string().required('O bairro é obrigatório'),
          cidade: Yup.string().required('A cidade é obrigatória'),
          cep: Yup.string().required('O CEP é obrigatório')
        }),
        cargo: Yup.string().required('Cargo é obrigatório'),
        nascimento: Yup.object().shape({
          dia: Yup.string().required('A data de nascimento é obrigatória'),
          mes: Yup.string().required('A data de nascimento é obrigatória'),
          ano: Yup.string().min(4).max(4).required('A data de nascimento é obrgatória')
        }),
        celular: Yup.string().required('Celular é obrigatório'),
        identidade: Yup.string().required('Identidade é obrigatório'),
        cpf : Yup.string().required('CPF é obrigatório'),
      });
    
      await schema.validate(data, {
        abortEarly: false,
      })
      const resposta = await axios.post('http://localhost:5000/registro',data);
      if(resposta.status === 200){
        console.log('foi')
      }

      console.log(data);
    
      formRef.current.setErrors({});

      reset();
        
    } catch (err){
      if(err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }
    

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          JOBS net.
        </h1>
        <a target="_blank" href="mailto:contato@jobsnet.com" rel="noreferrer"> Contato  </a>
      </header>
      
      <Form ref={formRef} initialData={null} onSubmit={handleSubmit} >
        <h2> Informações Básicas </h2>
        <div className="infosBasicas" >
          <label> Nome Completo * <br/>
            <Input id="nomeCompleto "name="nomeCompleto" placeholder="Nome Completo" onChange={(e) => {
              setCandidato({ ...candidato, nomeCompleto: e.target.value });
            }} />
          </label>
          <label> Cargo Pretendido *<br/>
            <Input id="cargo" name="cargo" onChange={(e) => {
              setCandidato({ ...candidato, cargo: e.target.value });
            }}/>
          </label>
          <div className="dataNascimento">
            <Scope path="nascimento"> 
              <Select id="dia" name="dia" label="Dia de nascimento *" options={selectNumber}  onChange={(e) => {
              setCandidato({ ...candidato, dia: e.target.value });
              }}>
                {selectNumber.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              </Select>
              <Select id="mes" name="mes" label="Mês de nascimento *" options={selectMonth}  onChange={(e) => {
              setCandidato({ ...candidato, mes: e.target.value });
               }} >
                {selectMonth.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
                ))}
              </Select>
              <label> Ano de Nascimento * <br/>
                <Input id="ano" type="number" name="ano" placeholder="Ano com 4 dígitos" onChange={(e) => {
                setCandidato({ ...candidato, ano: e.target.value });
                }}/>
              </label>
            </Scope> 
          </div>
          <Select id="genero" name="genero" label="Gênero" options={selectGender}  onChange={(e) => {
            setCandidato({ ...candidato, genero: e.target.value });
            }}>
            {selectGender.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select id="status" name="status" label="Estado Civil" options={selectStatus}  onChange={(e) => {
            setCandidato({ ...candidato, status: e.target.value });
             }}> 
            {selectStatus.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} 
          </Select>
          <div>
            <Scope path="endereco">
              <label> Logradouro * <br/>
                <Input id="rua" name="rua" onChange={(e) => {
                setCandidato({ ...candidato, rua: e.target.value });
                }}/>
              </label>
              <label> Número * <br/>
                <Input id="numero" name="numero"onChange={(e) => {
                setCandidato({ ...candidato, numero: e.target.value });
                }}/>
              </label>
              <label> Bairro * <br/>
                <Input id="bairro" name="bairro" onChange={(e) => {
                setCandidato({ ...candidato, bairro: e.target.value });
                }}/>
              </label>
              <label> Cidade *<br/>
                <Input id="cidade" name="cidade" onChange={(e) => {
                setCandidato({ ...candidato, cidade: e.target.value });
                }}/>
              </label>
              <label> CEP *<br/>
                <Input id="cep" name="cep" onBlur={() => {
                fetchEndereco();}} onChange={(e) => {
                setCandidato({ ...candidato, cep: e.target.value });
                }} />
              </label>
            </Scope>
          </div>
        </div>
        <h2> Informações de Contato </h2>
        <div className="infosContato">
          <label> Email * <br/>
            <Input id="email" type="email" name="email"onChange={(e) => {
            setCandidato({ ...candidato, email: e.target.value });
            }} />
          </label>
          <label> Telefone 01 <br/>
            <Input id="telefone1" name="telefone1"onChange={(e) => {
            setCandidato({ ...candidato, telefone1: e.target.value });
            }} />
          </label>
          <label> Telefone 02 <br/>
            <Input id="telefone2" name="telefone2" onChange={(e) => {
            setCandidato({ ...candidato, telefone2: e.target.value });
            }} />
          </label>
          <label> Celular *<br/>
            <Input id="celular" name="celular" onChange={(e) => {
            setCandidato({ ...candidato, celular: e.target.value });
            }} />
          </label>
          <label> Contato <br/>
            <Input id="contato" name="contato" onChange={(e) => {
            setCandidato({ ...candidato, contato: e.target.value });
            }}/>
          </label>
        </div>
        <div>
          <h2> Documentação </h2>
          <label> Identidade * <br/>
            <Input id="identidade" name="identidade" onChange={(e) => {
            setCandidato({ ...candidato, identidade: e.target.value });
            }} />
          </label>
          <label> CPF * <br/>
            <Input id="cpf" name="cpf"onChange={(e) => {
            setCandidato({ ...candidato, cpf: e.target.value });
            }}/>
          </label>
          <Select id="veiculo" name="veiculo" label="Possui veículo?" options={selectVehicle} onChange={(e) => {
          setCandidato({ ...candidato, veiculo: e.target.value });
          }}>
            {selectVehicle.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} 
          </Select>
          <Select id="licenca" name="licenca" label="Habilitação" options={selectLicense} onChange={(e) => {
          setCandidato({ ...candidato, licenca: e.target.value });
          }}>
            {selectLicense.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} 
          </Select>
        </div>
        <button type="submit" > Enviar </button>
      </Form>
    </div>
  );
}

export default App;
