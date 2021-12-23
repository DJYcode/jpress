package io.jpress.addon.friendlink.service.provider;

import io.jboot.aop.annotation.Bean;
import io.jpress.addon.friendlink.service.FriendLinkService;
import io.jpress.addon.friendlink.model.FriendLink;
import io.jboot.service.JbootServiceBase;

@Bean
public class FriendLinkServiceProvider extends JbootServiceBase<FriendLink> implements FriendLinkService {

}