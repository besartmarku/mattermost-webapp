// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
    favoriteChannel,
    unfavoriteChannel,
    updateChannelNotifyProps,
} from 'mattermost-redux/actions/channels';
import {getCustomEmojisInText} from 'mattermost-redux/actions/emojis';
import {General} from 'mattermost-redux/constants';
import {
    getCurrentChannel,
    getMyChannelMember,
    isCurrentChannelFavorite,
    isCurrentChannelMuted,
    isCurrentChannelReadOnly,
    getCurrentChannelStats,
} from 'mattermost-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';
import {
    getCurrentUser,
    getUser,
    makeGetProfilesInChannel,
} from 'mattermost-redux/selectors/entities/users';
import {getUserIdFromChannelName} from 'mattermost-redux/utils/channel_utils';

import {goToLastViewedChannel} from 'actions/views/channel';
import {openModal, closeModal} from 'actions/views/modals';
import {
    showFlaggedPosts,
    showPinnedPosts,
    showMentions,
    closeRightHandSide,
    updateRhsState,
} from 'actions/views/rhs';
import {getRhsState} from 'selectors/rhs';
import {isModalOpen} from 'selectors/views/modals';
import {ModalIdentifiers} from 'utils/constants';

import ChannelHeader from './channel_header';

function makeMapStateToProps() {
    const doGetProfilesInChannel = makeGetProfilesInChannel();

    return function mapStateToProps(state) {
        const channel = getCurrentChannel(state) || {};
        const user = getCurrentUser(state);

<<<<<<< HEAD
        let dmUser;
        let gmMembers;
        if (channel && channel.type === General.DM_CHANNEL) {
            const dmUserId = getUserIdFromChannelName(user.id, channel.name);
            dmUser = getUser(state, dmUserId);
        } else if (channel && channel.type === General.GM_CHANNEL) {
            gmMembers = doGetProfilesInChannel(state, channel.id, false);
        }
        const stats = getCurrentChannelStats(state) || {member_count: 0, guest_count: 0};

        return {
            teamId: getCurrentTeamId(state),
            channel,
            channelMember: getMyCurrentChannelMembership(state),
            currentUser: user,
            dmUser,
            gmMembers,
            rhsState: getRhsState(state),
            isFavorite: isCurrentChannelFavorite(state),
            isReadOnly: isCurrentChannelReadOnly(state),
            isMuted: isCurrentChannelMuted(state),
            isQuickSwitcherOpen: isModalOpen(state, ModalIdentifiers.QUICK_SWITCH),
            hasGuests: stats.guest_count > 0,
        };
=======
    return {
        teamId: getCurrentTeamId(state),
        channel,
        channelMember: getMyChannelMember(state, channel.id),
        currentUser: user,
        dmUser,
        rhsState: getRhsState(state),
        isFavorite: isCurrentChannelFavorite(state),
        isReadOnly: isCurrentChannelReadOnly(state),
        isMuted: isCurrentChannelMuted(state),
        isQuickSwitcherOpen: isModalOpen(state, ModalIdentifiers.QUICK_SWITCH),
        hasGuests: stats.guest_count > 0,
>>>>>>> c5cd9909ff88b506450f178fba3d245fea6ab24d
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        favoriteChannel,
        unfavoriteChannel,
        showFlaggedPosts,
        showPinnedPosts,
        showMentions,
        closeRightHandSide,
        updateRhsState,
        getCustomEmojisInText,
        updateChannelNotifyProps,
        goToLastViewedChannel,
        openModal,
        closeModal,
    }, dispatch),
});

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ChannelHeader));
