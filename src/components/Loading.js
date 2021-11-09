import React from 'react';
import styled from 'styled-components/native';

const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default () => {
	return (
		<Container>
			<LoadingIcon size="large" color="#f1c40f" />
		</Container>
	);
}