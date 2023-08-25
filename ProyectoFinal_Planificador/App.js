import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Alert,
    Pressable,
    Image,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import Login from './src/components/Login';
import BotonIncrementarPresupuesto from './src/components/BotonIncrementarPresupuesto';
import { object } from 'prop-types';
import {generarId} from './src/helpers'


const App = () => {

    const [ isValidPresupuest, setIsValidPresupuesto ] = useState(false)
    const [presupuesto, setPresupuesto] = useState(0)
    const [gastos, setGastos] = useState([])
    const [modal, setModal] = useState(false)
    const [gasto, setGasto] = useState({})
    const [filtro, setFiltro] = useState('')
    const [gastoFiltrados, setGastosFiltrados] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const incrementarPresupuesto = async () => {
        const incremento = 100; 
        const nuevoPresupuesto = parseInt(presupuesto) + incremento;

        // Actualizar el estado local con el nuevo presupuesto
        setPresupuesto(nuevoPresupuesto);
        // Actualizar el AsyncStorage con el nuevo presupuesto
        try {
            await AsyncStorage.setItem('planificador_presupuesto', nuevoPresupuesto.toString());
        } catch (error) {
            console.log(error);
        }
    };


    const obtenerPresupuestoStorage = async () => {
        try {
          const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0;
          if (presupuestoStorage > 0) {
            setPresupuesto(presupuestoStorage);
            setIsValidPresupuesto(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const obtenerGastosStorage = async () => {
        try {
            const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
            setGastos( gastosStorage ? JSON.parse(gastosStorage) : [] )
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const obtenerPresupuestoStorage = async () =>{
            try {
                const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
                if(presupuestoStorage > 0){
                    setPresupuesto(presupuestoStorage)
                    setIsValidPresupuesto(true)

                }
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPresupuestoStorage()
    }, [])



    useEffect(() => {
        if(isValidPresupuest){
            const guardarPresupuestoStorage = async () => {
                try {
                    await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
                } catch (error) {
                    console.log(error)
                }
            }
            guardarPresupuestoStorage()
        }
    }, [isValidPresupuest])


    useEffect(() => {
        const obtenerGastosStorage = async () => {
            try {
                const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
                setGastos( gastosStorage ? JSON.parse(gastosStorage) : [] )
            } catch (error) {
                console.log(error)
            }
        }
        obtenerGastosStorage()
    }, [])



    useEffect(() =>{
        const guardarGastosStorage = async () => {
            try {
                await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
            } catch (error) {
                console.log(error)
            }
        }
        guardarGastosStorage();
    }, [gastos])


    const handleNuevoPresupuesto = (presupuesto) => {
        if (Number(presupuesto) > 0) {
            setIsValidPresupuesto(true)
        } else {
            Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor', 'OK');
        }
    };


    const handleGasto = gasto => {

        if([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')){
            Alert.alert(
                "Error",
                "Todos los campos son obligatorios",
            )
            return
        }

        if(gasto.id){
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id
            ? gasto : gastoState )
            setGastos(gastosActualizados)
        } else {
            gasto.id = generarId()
            gasto.fecha = Date.now()
            setGastos([...gastos, gasto])
        }
        //Añadir el nuevo gasto al state
        setModal(!modal)
    }

    const eliminarGasto = id => {
        Alert.alert(
            '¿Desea eliminar este gasto?',
            'Un gasto eliminado no se puede recuperar',
            [
                {text: 'No', style: 'cancel'},
                {text: 'Si, Eliminar', onPress: () => {

                    const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id )
                    setGastos(gastosActualizados)
                    setModal(!modal)
                    setGasto({})
                }}
            ]
        )
    }

    const resetearApp = () => {
        Alert.alert(
            '¿Deseas resetear la app?',
            'Esto eliminará presupuesto y gastos',
            [
                {text: 'No', style:'cancelar'},
                {text: 'Si, Eliminar', onPress: async () =>{
                    try {
                        await AsyncStorage.clear()

                        setIsValidPresupuesto(false)
                        setPresupuesto(0)
                        setGastos([])

                    } catch (error) {
                        console.log(error)
                    }
                }}
            ]

        )
    }

    useEffect(() => {
        async function initializeApp() {
            await AsyncStorage.removeItem('userLoggedIn'); // Elimina la clave de autenticación anterior
            checkLoginStatus();
            obtenerPresupuestoStorage();
            obtenerGastosStorage();
        }
        initializeApp();
    }, []);
    
    const checkLoginStatus = async () => {
        try {
            await AsyncStorage.removeItem('userLoggedIn'); // Elimina la clave de autenticación anterior
            const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
            setIsLoggedIn(userLoggedIn === 'true');
        } catch (error) {
            console.log(error);
        }
    };
    


    return (
        <View style={styles.contenedor}>
            <ScrollView>
                <View style={styles.header}>
                    {isLoggedIn ? (
                        <>
                            <Header />
                            {isValidPresupuest ? (
                                <ControlPresupuesto
                                    presupuesto={presupuesto}
                                    gastos={gastos}
                                    resetearApp={resetearApp}
                                    incrementarPresupuesto={incrementarPresupuesto}
                                />
                            ) : (
                                <NuevoPresupuesto
                                    presupuesto={presupuesto}
                                    setPresupuesto={setPresupuesto}
                                    handleNuevoPresupuesto={handleNuevoPresupuesto}
                                />
                            )}
                        </>
                    ) : (
                        <Login onLogin={() => setIsLoggedIn(true)}/>
                    )}
    
                    {isValidPresupuest && (
                        <>
                            <Filtro
                                filtro={filtro}
                                setFiltro={setFiltro}
                                gastos={gastos}
                                setGastosFiltrados={setGastosFiltrados}
                            />
                            
                            <ListadoGastos
                                gastos={gastos}
                                setModal={setModal}
                                setGasto={setGasto}
                                filtro={filtro}
                                gastoFiltrados={gastoFiltrados}
                            />
                            
                        </>
                    )}

                    {/* Agrega el nuevo componente BotonIncrementarPresupuesto */}
                    {isValidPresupuest && (
                        <BotonIncrementarPresupuesto
                            incrementarPresupuesto={incrementarPresupuesto}
                            resetearApp={resetearApp}
                        />
                    )}
                </View>
            </ScrollView>
    
            {modal && (
                <Modal
                    animationType='slide'
                    visible={modal}
                    onRequestClose={() => {
                        setModal(!modal)
                    }}
                >
                    <FormularioGasto
                        setModal={setModal}
                        handleGasto={handleGasto}
                        gasto={gasto}
                        setGasto={setGasto}
                        eliminarGasto={eliminarGasto}
                    />
                </Modal>
            )}
    
            {isValidPresupuest && (
                <Pressable
                    style={styles.pressable}
                    onPress={() => setModal(!modal)}
                >
                    <Image
                        style={styles.imagen}
                        source={require('./src/img/nuevo-gasto.png')}                    
                    />
                </Pressable>
            )}
        </View>
    );
    
};

const styles = StyleSheet.create({ // Cambio "Styles" por "styles"
    contenedor:{
        backgroundColor:'#F5F5F5',
        flex:1
    },
    header:{
        backgroundColor: '#3B82F6',
        minHeight:400
    },
    pressable:{
        width:60,
        height: 60,
        position:'absolute',
        bottom: 30,
        right: 30

    },
      imagen:{
        width:60,
        height: 60,
        
    }
});

export default App;