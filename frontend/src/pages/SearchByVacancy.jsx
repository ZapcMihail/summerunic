import React, { useState } from 'react';
import { Center, FormControl, Input, Flex, Button, Spinner, Box, Select, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import JobCard from '../components/JobCard/JobCard';

function SearchByVacancy() {
    const [vacancy, setVacancy] = useState('');
    const [loading, setLoading] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setVacancy(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/search_by_vacancy?vacancy_query=${vacancy}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            setVacancies(data || []); // Assuming response format contains "vacancies" field
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Flex bgColor='teal' color='white' gap={10} py={2} pl={5}>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/')}>Поиск по скилам</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/searchByFullTime')}>Поиск по вакансиям</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/searchByPars')}>Парсинг</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/SearchByPartTime')}>Поиск частичная</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/searchByFullTime')}>Поиск фултайм</Text>
        </Flex>
        <Center mt={"30px"}>
            <Flex flexDir={"column"} gap={'20px'}>
                <Box display={"flex"} gap={"20px"} justifyContent="center">
                        <Input w="500px" placeholder='Поиск по вакансиям' value={vacancy} onChange={handleInputChange} />
                </Box>
                <Center>
                    <Button colorScheme='teal' variant='solid' w={"200px"} onClick={handleSearch}>
                        Отправить запрос
                    </Button>
                </Center>
                {loading && <Center><Spinner size="xl" mt="4" /></Center>}
                {error && <Box color="red.500" mt="4">{error}</Box>}

                {vacancies.length > 0 && (
                    <Flex flexDir="column" mt="4">
                        {vacancies.map((vacancy, index) => (
                            <JobCard key={index} {...vacancy} />
                        ))}
                    </Flex>
                )}
            </Flex>
        </Center>
        </>
        
    );
}

export default SearchByVacancy;
