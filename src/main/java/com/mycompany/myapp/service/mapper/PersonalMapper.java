package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PersonalDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Personal and its DTO PersonalDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface PersonalMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    PersonalDTO personalToPersonalDTO(Personal personal);

    List<PersonalDTO> personalsToPersonalDTOs(List<Personal> personals);

    @Mapping(source = "userId", target = "user")
    Personal personalDTOToPersonal(PersonalDTO personalDTO);

    List<Personal> personalDTOsToPersonals(List<PersonalDTO> personalDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Personal personalFromId(Long id) {
        if (id == null) {
            return null;
        }
        Personal personal = new Personal();
        personal.setId(id);
        return personal;
    }
    

}
