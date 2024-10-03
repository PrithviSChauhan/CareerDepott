import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const FilterData = [
  {
    filterType:"Location",
    array:["Delhi NCR", "Bangalore", "Pune", "Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Pharma", "Software", "Audit"]
  },
  {
    filterType:"Salary",
    array:["10K-50K", "50K-80K", ">80k"]
  }
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          FilterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg mt-3'>{data.filterType}</h1>
              {
                data.array.map((item, index)=> {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem className='bg-white size-0' value={item} />
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard