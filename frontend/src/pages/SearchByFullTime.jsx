import React, { useState, useEffect } from 'react';
import { Center, Flex, Spinner, Box, Select, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import JobCard from '../components/JobCard/JobCard';

function SearchByFullTime() {
    const [isLoading, setIsLoading] = useState(false);
    const [jobListings, setJobListings] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadJobListings = async () => {
            setIsLoading(true);
            setFetchError(null);

            try {
                const response = await fetch(`http://localhost:8000/full_time`);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const result = await response.json();
                setJobListings(result.vacancies);
            } catch (error) {
                setFetchError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadJobListings();
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

                {isLoading && <Center><Spinner size="xl" mt="4" /></Center>}
                {fetchError && <Box color="red.500" mt="4">{'вакансии не найдены'}</Box>}

                {jobListings.length > 0 && (
                    <Flex flexDir="column" mt="4">
                        {jobListings.map((job, index) => (
                            <JobCard key={index} {...job} />
                        ))}
                    </Flex>
                )}
            </Flex>
        </Center>
        </>
        
    );
}

export default SearchByFullTime;
