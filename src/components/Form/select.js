import { useRef, useEffect } from 'react'
import { useField } from '@unform/core'


export default function Select({ name, label, children, ...rest }) {
    const selectRef = useRef(null)
  
    const { fieldName, defaultValue, registerField, error } = useField(name)
  
    useEffect(() => {
      registerField({
        ref: selectRef,
        name: fieldName,
        getValue: ref => {
          return ref.current?.value
        },
        setValue: (ref, newValue) => {
          ref.current.value = newValue
        },
        clearValue: ref => {
          ref.current.value = ''
        },
      })
    }, [fieldName, registerField])
  
    return (
      <div>
        <label htmlFor={fieldName}>{label}</label>
  
        <select
          id={fieldName}
          ref={selectRef}
          defaultValue={defaultValue}
          {...rest}
        >
          {children}
        </select>
  
        {error && <span className="error">{error}</span>}
      </div>
    )
  };
  export const selectGender = [
    { value : '', label : ''},
    { value : 'feminino', label : 'Feminino'},
    { value : 'masculino', label : 'Masculino'},
    { value : 'fluido', label : 'Flúido'},
    { value : 'outro', label : 'Outro'},
  ];
  export const selectMonth = [
    { value : '', label : ''},
    { value : 'janeiro', label: 'Janeiro'},
    { value : 'fevereiro', label: 'Fevereiro'},
    { value : 'março', label: 'Março'},
    { value : 'abril', label: 'Abril'},
    { value : 'maio', label: 'Maio'},
    { value : 'junho', label: 'Junho'},
    { value : 'julho', label: 'Julho'},
    { value : 'agosto', label: 'Agosto'},
    { value : 'setembro', label: 'Setembro'},
    { value : 'outubro', label: 'Outubro'},
    { value : 'novembro', label: 'Novembro'},
    { value : 'dezembro', label: 'Dezembro'},
  ]
 export const selectNumber = [
    { value : '', label : ''},
    { value: '01' , label: '01' },
    { value: '02' , label: '02' },
    { value: '03' , label: '03' },
    { value: '04' , label: '04' },
    { value: '05' , label: '05' },
    { value: '06' , label: '06' },
    { value: '07' , label: '07' },
    { value: '08' , label: '08' },
    { value: '09' , label: '09' },
    { value: '10' , label: '10' },
    { value: '11' , label: '11' },
    { value: '12' , label: '12' },
    { value: '13' , label: '13' },
    { value: '14' , label: '14' },
    { value: '15' , label: '15' },
    { value: '16' , label: '16' },
    { value: '17' , label: '17' },
    { value: '18' , label: '18' },
    { value: '19' , label: '19' },
    { value: '20' , label: '20' },
    { value: '21' , label: '21' },
    { value: '22' , label: '22' },
    { value: '23' , label: '23' },
    { value: '24' , label: '24' },
    { value: '25' , label: '25' },
    { value: '26' , label: '26' },
    { value: '27' , label: '27' },
    { value: '28' , label: '28' },
    { value: '29' , label: '29' },
    { value: '30' , label: '30' },
    { value: '31' , label: '31' },
  ];
  export const selectStatus = [
    { value : '', label : ''},
    { value : 'solteiro', label : 'Solteiro'},
    { value : 'casado', label : 'Casado'},
    { value : 'divorciado', label : 'Divorciado'},
    { value : 'viuvo', label : 'Viúvo'},
  ];