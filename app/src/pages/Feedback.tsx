import { Image, StyleSheet, View } from "react-native";
import { Text } from "../components/ui/Typography/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FeedbackProps } from "../@types/navigation";
import { theme } from "../global/theme";

import onDietPNG from '../assets/images/is-on-diet.png'
import outDietPNG  from '../assets/images/is-out-diet.png'
import { Button } from "../components/ui/buttons";

export function Feedback() {

  const route = useRoute()
  const navigation = useNavigation() 
  const { isDiet } = route.params as FeedbackProps

  const handleToHomePage = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
     <View style={styles.header}>
      { isDiet ? (
         <>
         <Text color="green.dark" weight="bold" size={"2xl"}>Continue assim!</Text>
         <Text size='md' color="gray.100" style={{ textAlign: 'center' }}>
           Você continua{' '}
           <Text weight="bold" size="md" color="gray.100" >dentro da dieta.</Text>{' '}
           Muito bem!
         </Text>
         </>
      ) : (
        <>
        <Text color="red.dark" weight="bold" size={"2xl"}>Que pena!</Text>
        <Text size='md' color="gray.100" style={{ textAlign: 'center' }}>
          Você{' '}
          <Text weight="bold" size="md" color="gray.100" >saiu da dieta</Text>{' '}
          dessa vez, mas continue se esforçando e não desista!
        </Text>
        </>
      )}
     </View>

     {isDiet ? <Image source={onDietPNG}  style={styles.image}/> : <Image source={outDietPNG} style={styles.image}/>}
    
     <Button 
      title="Retornar a página inicial"
      onPress={handleToHomePage}
     />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[700],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 40,
  },
  header: {
    gap: 8,
    alignItems: 'center'
  },
  image: {
    width: 224,
    height: 288,
  }
})