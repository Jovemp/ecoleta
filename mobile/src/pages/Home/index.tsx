import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, ImageBackground,StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}
interface Item {
    label: string;
    value: string;
}

const Home = () => {

    const navigation = useNavigation();

    const placeholderUF = {label:"Selecione uma UF" };
    const placeholderCity = { label: "Selecione uma Cidade" };

    const [ufs, setUfs] = useState<Item[]>([]);
    const [citys, setCitys] = useState<Item[]>([]);
    const [selectedUf, setSelectedUF] = useState<string>('0');
    const [selectedCity, setSelectedCity] = useState<string>('0');

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => ({ label: uf.sigla, value: uf.sigla }));
                if (ufInitials.length === 0) {
                    setUfs([{ label: '0', value: '0'}]);
                } else {
                    setUfs(ufInitials);
                }
            })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return ;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => ({ label: city.nome, value: city.nome }));
                if (cityNames.length === 0) {
                    setCitys([{ label: '0', value: '0'}]);
                } else {
                    setCitys(cityNames);
                }
            })
    }, [selectedUf])

    function handleNavigavigateToPoints() {
        navigation.navigate('Point', { uf: selectedUf, city: selectedCity });
    }
    

    return (
    <ImageBackground 
        source={require('../../assets/home-background.png')}  
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}>
        <View style={styles.main}>
            <Image source={require('../../assets/logo.png')} />
            <Text style={styles.title} >Seu marketplace de coleta de residuos</Text>
            <Text style={styles.description} >Ajudamos pessoas a encontrarem  pontos de coleta de forma efeciente</Text>
        </View>

        <View style={styles.footer} >
            <RNPickerSelect
               placeholder={placeholderUF}
               items={ufs}
               onValueChange={value => setSelectedUF(value)}
               style={styles.select}
               value={selectedUf}
            />

            <RNPickerSelect
               placeholder={placeholderCity}
               items={citys}
               onValueChange={value => setSelectedCity(value)}
               style={styles.select}
               value={selectedCity}
            />
            <RectButton style={styles.button} onPress={handleNavigavigateToPoints}>
                <View style={styles.buttonIcon}>
                    <Icon name="arrow-right" color="#FFF" size={24}/>
                </View>
                <Text style={styles.buttonText} >
                    Entrar
                </Text>
            </RectButton>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;