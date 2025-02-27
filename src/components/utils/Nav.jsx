import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Flex, 
  IconButton, 
  Heading, 
  Input, 
  InputRightAddon, 
  InputGroup,
  Tooltip, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Box,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea
} from "@chakra-ui/react";
import { 
  HamburgerIcon, 
  Search2Icon, 
  SettingsIcon,
  SmallCloseIcon,
  CloseIcon
} from "@chakra-ui/icons";
import { 
  FaTh, 
  FaBars, 
  FaRegUser, 
  FaUserCheck
} from 'react-icons/fa';
import { TbChecklist } from 'react-icons/tb';
import { app } from "../../firebaseConfig";
import { getAuth, signOut } from 'firebase/auth';

const Nav = ({ 
  side, 
  setSide,
  gridView,
  setGridView,
  filterNote,
  searchInput,
  setSearchInput,
  showModal,
  setShowModal,
  setFilterSearch
}) => {
  const myApp = app;
  const {colorMode, toggleColorMode} = useColorMode();
  const auth=getAuth();
  const user = auth.currentUser;
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const navigate = useNavigate();
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [allMsg, setAllMsg] = useState([
    {
      id: 1,
      msg: 'We love your service'
    }
  ]);

  const message = () => {
    feedbackMsg !== '' && setAllMsg([
      ...allMsg, 
      {
        id: Math.floor(Math.random() * 1000),
        msg: feedbackMsg
      }
    ]);

    setFeedbackMsg('');
  }

  const modalStyle = {
    mt: '100px',
    w: '300px'
  }
  
  const iconStyle = {
    bgColor: 'transparent',
    fontSize: ['.9rem', null, null, '1.2rem'],
    borderRadius: '100%'
  }

  const listStyle = {
    p: '5px 10px',

    _hover: {
      bg: 'orange'
    }
  }

  const bg = useColorModeValue('#fff', '#1a202c');

  const signOutUser = () => {
    signOut(auth).then(() => {
      navigate('/')
    })
    .catch(() => console.log(myApp))
  }

  return (
    <Flex bg={bg} sx={{
      w: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: ['20px 10px', null, null, '20px'],
      gap: '20px',
      pos: 'fixed',
      top: 0,
      zIndex: '1500',
      boxShadow: '0px 1px 2px #000', 
    }}>
      <Flex sx={{
        alignItems: 'center',
        gap: ['9px', null, null, '10px']
      }}>
        <Tooltip hasArrow label='Main Menu' borderRadius={'5px'}>
          <IconButton
            onClick={()=> setSide(!side)} 
            sx={iconStyle} 
            icon={side ? <HamburgerIcon /> : <SmallCloseIcon />
          } 
          />
        </Tooltip>
        
        <Link to='/home'>
          <Heading  sx={{
            fontSize: ['.9rem', null, '1rem', '1.5rem'],
            fontWeight: '500'
            }}><IconButton sx={{
              fontSize: ['1.5rem', null, null, '2.5rem'],
              bg: 'transparent',
              cursor: 'auto',
              color: '#c5341b',
              _hover: {
                bg: 'transparent'
              }
            }} icon={<TbChecklist />}/>KipNote
          </Heading>
        </Link>
      </Flex>

      {
        location.pathname === '/home' &&
        <Flex display= {['none', null, null, null, 'flex']}>
          <InputGroup sx={{
            w: ['300px', null, null, null, '320px', '500px']
          }}>
            <Input 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} 
              onKeyUp={() => filterNote()}
              onClick={()=> setShowModal(true)}
              type={'text'} 
              variant={'filled'} 
            />
              <Tooltip label={showModal ? 'Clear search' : 'Search'}>
                <InputRightAddon
                  onClick={()=> {
                    setShowModal(!showModal)
                    setSearchInput('')
                    setFilterSearch('')
                  }}
                  children={showModal ? <CloseIcon /> : <Search2Icon />} 
                  cursor={'pointer'} 
                />
              </Tooltip>
          </InputGroup>
        </Flex>
      }

      <Flex sx={{
        alignItems: 'center',
        gap: [0, null, null, '5px']
      }}>
        {location.pathname === '/home' &&
          <Tooltip 
            hasArrow 
            label={showModal ? 'Clear search' : 'Search'} 
            borderRadius={'5px'}
          >
            <IconButton 
              sx={iconStyle} 
              icon={showModal ? <CloseIcon /> : <Search2Icon />}
              display={['flex', null, null, null, 'none']}
              onClick={() => {
                setShowModal(!showModal)
                setSearchInput('')
                setFilterSearch('')
              }} 
            />
          </Tooltip>
        }
        {location.pathname !== '/todos' && 
        <Tooltip hasArrow label={gridView ? 'List View' : 'Grid View'} borderRadius={'5px'}>
            <IconButton 
              sx={iconStyle} 
              icon={gridView ? <FaBars /> : <FaTh />}
              display= {['none', null, null, null, 'flex']}
              onClick={() => setGridView(!gridView)} 
            />
        </Tooltip>}
        <Popover>
          <PopoverTrigger>
            <IconButton 
              sx={iconStyle} 
              icon={<SettingsIcon />} 
            />
          </PopoverTrigger>
          <PopoverContent bg={bg} sx={{
            w: '200px',
            overflow: 'hidden',
            border: 'none',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)'
          }}>
            <PopoverBody 
                sx={listStyle} 
                onClick={toggleColorMode}
              >
              <Text cursor={'pointer'}>
                {colorMode === 'dark' ? 'Disable dark theme' : 'Enable dark theme' }
              </Text>
            </PopoverBody>
            <PopoverBody
              onClick={onOpen}
              sx={listStyle}><Text cursor={'pointer'}>Send Feedback</Text>
            </PopoverBody>
            <Link to={'/help'}>
              <PopoverBody sx={listStyle}><Text cursor={'pointer'}>Help</Text></PopoverBody>
            </Link>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <IconButton
              sx={iconStyle}  
              icon={<FaRegUser />} 
            />
          </PopoverTrigger>
          <PopoverContent sx={{
            textAlign: 'center',
            w: '260px',
            border: 'none',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)'
          }}>
            <PopoverBody fontSize={'3rem'}>
              <IconButton 
                icon={<FaUserCheck />}
                sx={{
                  fontSize: '5rem',
                  bg: 'transparent',
                  m: '10px 0',
                  _hover: {
                    bg: 'transparent',
                  }
                }} 
              />
            </PopoverBody>
            <PopoverBody>{user.email}</PopoverBody>
            <PopoverBody><Link to={'/update'}><Text sx={{
              p: '5px',
              border: '1px solid',
              borderRadius: '5px'
            }}>Manage your account</Text></Link></PopoverBody>
            <PopoverBody cursor={'pointer'}>
              <Text onClick={signOutUser} sx={{
                  p: '5px',
                  border: '1px solid',
                  borderRadius: '5px'
                }}>Sign Out
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Modal
          initialFocusRef={initialRef} 
          isOpen={isOpen} 
          onClose={onClose}
          motionPreset='slideInBottom'
        >
            <ModalContent sx={modalStyle}>
                <ModalHeader sx={{
                    bg: '#c5341b',
                    color: '#fff'
                }}>Send Feedback</ModalHeader>
                <ModalBody>
                    <form action="POST">
                        <Textarea 
                          sx={{
                            border: 'none',
                            p: '5px',
                            height: '150px',
                              outline: 'none'
                          }}
                          variant={'unstyled'}
                          resize={'none'}
                          value={feedbackMsg}
                          onChange={(e) => setFeedbackMsg(e.target.value)}
                          placeholder="Have Feedback? We'd love to hear it, but please don't share sensitive information. Have questions? Try help or support." 
                        />

                        <Box>
                          <Text 
                              sx={{
                                  fontSize: '.9rem',
                                  m: '10px 0'
                              }}
                          >Some account and system information may be send to KipNote. We will use it to fix problems and inprove our services. We may email you for information or update.</Text>
                        </Box>

                        <button onClick={(e) => {
                          e.preventDefault();
                          message()
                        }} style={{
                          backgroundColor: '#c5341b',
                          color: '#fff',
                          padding: '5px 10px',
                          fontWeight: '500'
                        }} type="submit">Send</button>
                    </form>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Flex>
  )
}

export default Nav