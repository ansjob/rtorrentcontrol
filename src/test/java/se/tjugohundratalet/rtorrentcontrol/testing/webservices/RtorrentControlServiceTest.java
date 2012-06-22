package se.tjugohundratalet.rtorrentcontrol.testing.webservices;

import com.sun.jersey.test.framework.AppDescriptor;
import com.sun.jersey.test.framework.JerseyTest;
import com.sun.jersey.test.framework.WebAppDescriptor;
import com.sun.jersey.test.framework.spi.container.grizzly.web.GrizzlyWebTestContainerFactory;
import org.junit.Test;

/**
 *
 * @author ansjob
 */
public class RtorrentControlServiceTest extends JerseyTest {
	
	public RtorrentControlServiceTest() throws Exception {
		super( new GrizzlyWebTestContainerFactory());
	}
	
	@Override
	public AppDescriptor configure() {
		return new WebAppDescriptor.Builder("se.tjugohundratalet.rtorrentcontrol.services").contextPath("rtorrentcontrol").build();
	}
	
	@Test
	public void someTest() {
		System.out.println("HELLLO");
	}
}
