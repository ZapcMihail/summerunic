import React, { useState, useEffect } from 'react';
import { Center, Flex, Spinner, Box, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import JobCard from '../components/JobCard/JobCard';

function SearchByPartTime() {
    const [loading, setLoading] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8000/part_time`);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                const data = await response.json();
                setVacancies(data.vacancies);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <Flex bgColor='teal' color='white' gap={10} py={2} pl={5}>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/')}>Поиск по скилам</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/searchByVacancy')}>Поиск по вакансиям</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/searchByPars')}>Парсинг</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/SearchByPartTime')}>Поиск частичная</Text>
            <Text sx={{cursor: 'pointer'}} fontSize={20} onClick={() => navigate('/searchByFullTime')}>Поиск фултайм</Text>
        </Flex>
        <Center mt={"30px"}>
            <Flex gap={'20px'} flexDir={"column"} align={"center"}>

                {loading && <Center><Spinner size="xl" mt="4" /></Center>}
                {error && <Box color="red.500" mt="4">{'вакансии не найдены'}</Box>}

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

export default SearchByPartTime;
