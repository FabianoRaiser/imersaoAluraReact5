import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorites } from "../src/components/Favoritos";

function HomePage() {
    const estiloDaPagina = {
        // backgroundColor: "red" 
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");


    //console.log(config.playlist);

    return (
        <>
            <CSSReset />
            <div style={estiloDaPagina}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
                <Favoritos favoritos={config.favoritos} />
            </div>
        </>
    )
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
    .user-info img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

`;

const StyledBanner = styled.div`
    background-image: url(${({bg}) => bg });
    height: 230px;
`

function Header() {
    return (
        <StyledHeader>
            <section>
                <StyledBanner bg={config.banner} />
            </section>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...props }) {
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);


    return (
        <StyledTimeline>
            {playlistNames.map((playlistNames) => {
                const videos = props.playlists[playlistNames];
                return (
                    <section key={playlistNames}>
                        <h2>{playlistNames}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    )
}

function Favoritos(props) {
    const listFavoritos = Object.keys(props.favoritos);

    return (
        <StyledFavorites>
            {listFavoritos.map((listFavoritos) => {
                const canais = props.favoritos[listFavoritos];
                // console.log(canais);
                return (
                    <section key={listFavoritos}>
                        <h2>{listFavoritos}</h2>
                        <div>
                            {canais.map((canais) => {
                                return (
                                    <a key={canais.urlUser} href={canais.urlUser}>
                                        <img src={canais.imgUser} />
                                        <span>
                                            {canais.nameUser}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledFavorites>
    )
}