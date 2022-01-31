import { useState } from "react";
import {
    Col,
    FormGroup,
    Input,
    Row,
    Button
} from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getList } from "../redux/actions/listActions";
import { list } from "../pages/home/Home";
import * as constants from "../constants/constants";
const MetaDataRow = () => {
    const [trait, setTrait] = useState('')
    const [value, setValue] = useState('')
    const [isHidden, setIsHidden] = useState(false)

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const onChangeTrait = (event) => {
        setTrait(event.target.value)
    }
    const onChangeValue = (event) => {
        setValue(event.target.value)
    }
    const addToTraitList = () => {
        list.push({ [trait]: value })
        dispatch(getList(list))
        setIsHidden(true)
    }
    return (
        <>
            <Row>
                <Col sm="2">
                    <FormGroup>
                        <Input
                            value={trait}
                            onChange={onChangeTrait}
                            id="nameOfTrait"
                            placeholder="Trait"
                            type="text"

                        />
                    </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        <Input
                            value={value}
                            onch
                            onChange={onChangeValue}
                            id="valueOfTrait"
                            placeholder="Value"
                            type="text"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <Button onClick={() => addToTraitList()} hidden={isHidden} style={{ width: 35, height: 37 }} color="primary" >
                        {constants.PLUS}
                    </Button>
                </Col>
            </Row>
        </>
    )
}
export default MetaDataRow