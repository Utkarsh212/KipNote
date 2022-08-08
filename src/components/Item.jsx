import { 
    Box, 
    Stack, 
    Text,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    IconButton,
    HStack,
    Flex
} from "@chakra-ui/react/";
import { BellIcon } from "@chakra-ui/icons";
import { 
    FaThumbtack, 
    FaUserPlus, 
    FaEllipsisV, 
    FaArchive 
} from 'react-icons/fa';

const Item = ({ 
    each,
    note,
    setNote,
    buttonStyle,
    textStyle,
    iconStyle,
    listStyle,
    stackStyle,
    toggle,
    pin,
    archive,
    onOpen,
    toggleDelete
}) => {

  return (
    <Stack 
        sx={stackStyle}
        m={'10px 0'}
    >
        <Box>
            <Flex sx={{
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text sx={{
                    pl: '10px'
                }}>{each.title}</Text>

                <Tooltip label={each.pin ? 'Unpin Note' : 'Pin Note'}>
                    <IconButton
                        onClick={() => {
                            pin(each.id)
                        }} 
                        icon={<FaThumbtack />}
                        sx={buttonStyle}
                        borderRadius={'100%'} 
                    />
                </Tooltip>
            </Flex>

            <Box sx={textStyle}>{each.body}</Box>
            <Box>{each.label}</Box>
        </Box>

        <HStack spacing={[2, null, null, null, 5]}>
            <Tooltip label='Remind me'>
                <IconButton onClick={() => toggle(each.id)} sx={iconStyle} icon={<BellIcon />} />
            </Tooltip>
            <Tooltip label='Collaborator'>
                <IconButton sx={iconStyle} icon={<FaUserPlus />} />
            </Tooltip>
            <Popover>
                <PopoverTrigger>
                    <IconButton sx={iconStyle} icon={<FaEllipsisV />} />
                </PopoverTrigger>
                <PopoverContent sx={{
                    w: '200px',
                    bg: '#1A202C',
                    color: 'white',
                    listStyleType: 'none',
                    overflow: 'hidden'
                }}>
                    <PopoverBody 
                        onClick={() => toggleDelete(each.id)} 
                        sx={listStyle} 
                        cursor={'pointer'}>Delete note
                    </PopoverBody>
                    <PopoverBody 
                        sx={listStyle} 
                        cursor={'pointer'}>
                        <Text onClick={onOpen}>Add Label</Text>
                    </PopoverBody>
                    <PopoverBody sx={listStyle} cursor={'pointer'}>Add Drawing</PopoverBody>
                    <PopoverBody sx={listStyle} cursor={'pointer'}>Show Checkboxes</PopoverBody>
                </PopoverContent>
            </Popover>
            <Tooltip label={each.archive ? 'Unarchive' : 'Archive'}>
                <IconButton onClick={() => archive(each.id)} sx={iconStyle} icon={<FaArchive />} />
            </Tooltip>
        </HStack>
    </Stack>
  )
}

export default Item