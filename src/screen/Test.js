import { View, Text } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import Demo1 from './Demo1';


const Test = () => {
    const [count1 ,useCount1] = useState(0);
      const [count2 ,useCount2] = useState(0);

    const increaseCount2 = useCallback(() => 
    {
        console.log("here");
        useCount2(count2+1);
    },[count2])


    const calculation = useMemo(() => 
    {
        console.log("hereee");
        let total = 0;
        for(let i =0 ;i<100000;i++)
        {   
                total = total+i
        }
        return total
    },[])

  return (
    <View style = {{flex : 1,alignItems : "center",justifyContent : "center"}}>
            <Text>{calculation}</Text>
            <Text onPress={() => {useCount1(count1+1)}}>count :  {count1}</Text>
            <Demo1 counter2={count2} increaseCounter={increaseCount2}></Demo1>
    </View>
  )
}

export default Test


