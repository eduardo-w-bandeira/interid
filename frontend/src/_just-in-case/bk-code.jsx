const ProfilePage = () => {
    const { userId } = useParams();
    const { isLoggedIn, accessToken, userData: storedUserData } = getCredentials();
    const [userData, setUserData] = useState(storedUserData);
    const [Declarations, setDeclarations] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        if (!isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn, userId]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        if (!isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn, userId]);


    const handleDeclareClick = () => {
        setIsDeclaring(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDeclaration(prev => ({ ...prev, [name]: value }));
    };

    const handlePublishDeclaration = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/declarations/', {
                ...newDeclaration,
                user: userData.id,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setUserDeclarations(prev => [...prev, response.data]);
            setNewDeclaration({ title: '', body: '' });
            setIsDeclaring(false);
        } catch (error) {
            console.error("Error publishing declaration", error);
        }
    };
